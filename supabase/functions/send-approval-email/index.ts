import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://bestiari.es'
const APPROVAL_EMAIL = 'bestiariagencia@gmail.com'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record

    // Solo actuar en inserts con status='draft'
    if (payload.type !== 'INSERT' || record.status !== 'draft') {
      return new Response(JSON.stringify({ skipped: true }), { status: 200 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Generar tokens únicos para aprobar y rechazar
    const approveToken = crypto.randomUUID()
    const rejectToken = crypto.randomUUID()

    // Insertar tokens en la tabla
    const { error: tokenError } = await supabase.from('approval_tokens').insert([
      { post_id: record.id, token: approveToken, action: 'approve' },
      { post_id: record.id, token: rejectToken, action: 'reject' },
    ])

    if (tokenError) throw tokenError

    // URLs de acción
    const approveUrl = `${SITE_URL}/api/approve?token=${approveToken}`
    const rejectUrl = `${SITE_URL}/api/approve?token=${rejectToken}`

    // Obtener info del agente
    const { data: agent } = await supabase
      .from('agents')
      .select('name, animal')
      .eq('id', record.agent_id)
      .single()

    const agentName = agent?.name ?? 'Agente desconocido'
    const agentAnimal = agent?.animal ?? ''

    // Enviar email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Bestiari Blog <blog@bestiari.es>',
        to: [APPROVAL_EMAIL],
        subject: `📝 Nuevo post pendiente: "${record.title}" — ${agentName} ${agentAnimal}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0B0B; color: #F7F7F8; padding: 32px; border-radius: 12px;">
            <div style="margin-bottom: 24px;">
              <img src="${SITE_URL}/logo-white.png" alt="bestiari" style="height: 28px;" />
            </div>
            
            <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 8px;">Nuevo post para revisar</h1>
            <p style="color: #6B6B6B; margin: 0 0 32px;">Escrito por <strong style="color: #7B2FF7">${agentName}</strong> ${agentAnimal}</p>

            <div style="background: #1a1a1a; border-radius: 8px; padding: 24px; margin-bottom: 32px; border: 1px solid #2a2a2a;">
              <h2 style="font-size: 20px; margin: 0 0 12px; color: #F7F7F8;">${record.title}</h2>
              ${record.excerpt ? `<p style="color: #6B6B6B; margin: 0; line-height: 1.6;">${record.excerpt}</p>` : ''}
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 32px;">
              <a href="${approveUrl}" style="display: inline-block; background: #7B2FF7; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">✅ Aprobar y publicar</a>
              <a href="${rejectUrl}" style="display: inline-block; background: #1a1a1a; color: #F7F7F8; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; border: 1px solid #2a2a2a;">❌ Rechazar</a>
            </div>

            <p style="color: #6B6B6B; font-size: 14px;">Este link expira en 7 días. Puedes también gestionar posts desde el <a href="${SITE_URL}/admin/blog" style="color: #7B2FF7;">panel admin</a>.</p>
          </div>
        `,
      }),
    })

    if (!emailResponse.ok) {
      const err = await emailResponse.text()
      throw new Error(`Resend error: ${err}`)
    }

    return new Response(JSON.stringify({ success: true, post_id: record.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('send-approval-email error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
