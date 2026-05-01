-- ============================================================
-- FASE 1: Sistema de aprobación por email + cola social
-- Ejecutar en: Supabase SQL Editor
-- ============================================================

-- 1. TABLA: approval_tokens
CREATE TABLE IF NOT EXISTS approval_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  action TEXT NOT NULL CHECK (action IN ('approve', 'reject')),
  expires_at TIMESTAMP NOT NULL DEFAULT (now() + interval '7 days'),
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_approval_tokens_token ON approval_tokens(token);
CREATE INDEX IF NOT EXISTS idx_approval_tokens_post_id ON approval_tokens(post_id);

-- 2. TABLA: social_content_queue
CREATE TABLE IF NOT EXISTS social_content_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'newsletter')),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'posted', 'failed')),
  scheduled_at TIMESTAMP NOT NULL,
  posted_at TIMESTAMP,
  error_message TEXT,
  retry_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_social_queue_status ON social_content_queue(status);
CREATE INDEX IF NOT EXISTS idx_social_queue_scheduled ON social_content_queue(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_social_queue_platform ON social_content_queue(platform);

-- 3. FUNCIÓN RPC: handle_approval
-- Llamada desde el link del email (approve/reject)
CREATE OR REPLACE FUNCTION handle_approval(p_token TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_token_record RECORD;
  v_new_status TEXT;
BEGIN
  -- Buscar token válido y no usado
  SELECT * INTO v_token_record
  FROM approval_tokens
  WHERE token = p_token
    AND used_at IS NULL
    AND expires_at > now();

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'Token inválido o expirado');
  END IF;

  -- Determinar nuevo status
  v_new_status := CASE v_token_record.action
    WHEN 'approve' THEN 'published'
    WHEN 'reject'  THEN 'rejected'
    ELSE 'draft'
  END;

  -- Actualizar post
  UPDATE posts
  SET status = v_new_status,
      published_at = CASE WHEN v_new_status = 'published' THEN now() ELSE published_at END,
      updated_at = now()
  WHERE id = v_token_record.post_id;

  -- Marcar token como usado
  UPDATE approval_tokens
  SET used_at = now()
  WHERE id = v_token_record.id;

  -- Invalidar el otro token del mismo post
  UPDATE approval_tokens
  SET used_at = now()
  WHERE post_id = v_token_record.post_id
    AND id != v_token_record.id
    AND used_at IS NULL;

  RETURN json_build_object(
    'success', true,
    'action', v_token_record.action,
    'post_id', v_token_record.post_id,
    'new_status', v_new_status
  );
END;
$$;
