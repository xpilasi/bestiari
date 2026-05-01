# FASE 1 — Email Approval System

## Archivos creados

```
supabase/
  functions/
    send-approval-email/index.ts   ← Edge Function: envía email cuando se crea draft
    generate-social-content/index.ts ← Edge Function: genera contenido social al publicar
  migrations/
    20260501_approval_system.sql   ← Tablas + RPC function
src/views/
  ApproveView.vue                  ← Página /api/approve?token=xxx
```

## Setup en Supabase (pasos en orden)

### 1. Ejecutar migración SQL
Ve a Supabase → SQL Editor → pega y ejecuta `supabase/migrations/20260501_approval_system.sql`

### 2. Deploy Edge Functions
```bash
supabase functions deploy send-approval-email
supabase functions deploy generate-social-content
```

### 3. Configurar secrets en Supabase
Ve a Supabase → Edge Functions → Secrets:
```
RESEND_API_KEY=re_xxxx           ← Crear cuenta en resend.com (free)
ANTHROPIC_API_KEY=sk-ant-xxxx
SUPABASE_URL=https://fkqwlqketwtxuqxizzwr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxxx   ← En Supabase → Settings → API
SITE_URL=https://bestiari.es
```

### 4. Configurar Webhooks en Supabase
Ve a Supabase → Database → Webhooks → Create:

**Webhook 1: send-approval-email**
- Tabla: `posts`
- Eventos: `INSERT`
- URL: `https://fkqwlqketwtxuqxizzwr.supabase.co/functions/v1/send-approval-email`
- Headers: `Authorization: Bearer {SUPABASE_ANON_KEY}`

**Webhook 2: generate-social-content**
- Tabla: `posts`
- Eventos: `UPDATE`
- URL: `https://fkqwlqketwtxuqxizzwr.supabase.co/functions/v1/generate-social-content`
- Headers: `Authorization: Bearer {SUPABASE_ANON_KEY}`

### 5. Añadir ruta en Vue Router
En `src/router/index.js`, añadir:
```js
{
  path: '/api/approve',
  component: () => import('../views/ApproveView.vue')
}
```

### 6. Crear cuenta Resend
- Ir a https://resend.com
- Crear cuenta gratis (100 emails/día)
- Verificar dominio `bestiari.es`
- Copiar API key → añadir como secret en Supabase

## Flujo completo

```
[Agente vía MCP]
    ↓ INSERT post (status='draft')
[Supabase Webhook]
    ↓ trigger send-approval-email
[Edge Function]
    ↓ genera tokens approve/reject
    ↓ Resend API → email a bestiariagencia@gmail.com
[Xavi hace click en email]
    ↓ GET /api/approve?token=xxx
[ApproveView.vue]
    ↓ supabase.rpc('handle_approval', { token })
[RPC Function]
    ↓ UPDATE posts SET status='published'
    ↓ trigger generate-social-content (Webhook UPDATE)
[Edge Function]
    ↓ Claude API genera tweets + LinkedIn
    ↓ INSERT social_content_queue
```

## Pending (FASE 3)
- `.github/workflows/post-to-social.yml`
- `scripts/post_to_social.py`
