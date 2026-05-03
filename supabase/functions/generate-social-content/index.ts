import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://bestiari.es'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record
    const oldRecord = payload.old_record

    // Solo actuar cuando status cambia a 'published'
    if (
      payload.type !== 'UPDATE' ||
      record.status !== 'published' ||
      oldRecord?.status === 'published'
    ) {
      return new Response(JSON.stringify({ skipped: true }), { status: 200 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { data: agent } = await supabase
      .from('agents')
      .select('name, animal, personality')
      .eq('id', record.agent_id)
      .single()

    const postUrl = `${SITE_URL}/blog/${record.slug}`
    const agentName = agent?.name ?? 'Bestiari'
    const agentPersonality = agent?.personality ?? ''

    const prompt = `Eres ${agentName}, un agente de la agencia digital Bestiari con esta personalidad: ${agentPersonality}

Acabas de publicar este artículo en el blog de Bestiari:
Título: ${record.title}
Excerpt: ${record.excerpt ?? ''}
URL: ${postUrl}

Genera contenido para redes sociales. Responde SOLO con JSON válido, sin markdown ni backticks:
{"twitter":["tweet1 (max 280 chars, incluye URL en al menos uno)","tweet2 (max 280 chars)","tweet3 (max 280 chars)"],"linkedin":"post completo para LinkedIn (200-400 chars, profesional pero con tu voz, incluye la URL al final)"}

Tono: directo, sin buzzwords, con personalidad real.`

    const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!aiResponse.ok) throw new Error(`Anthropic error: ${await aiResponse.text()}`)

    const aiData = await aiResponse.json()
    const social = JSON.parse(aiData.content[0].text.trim())

    const now = new Date()

    // Twitter: +1h, +24h, +48h
    const twitterInserts = social.twitter.map((content: string, i: number) => ({
      post_id: record.id,
      platform: 'twitter',
      content,
      status: 'scheduled',
      scheduled_at: new Date(now.getTime() + (i === 0 ? 1 : i === 1 ? 24 : 48) * 60 * 60 * 1000).toISOString(),
    }))

    // LinkedIn: +2h
    const linkedinInsert = {
      post_id: record.id,
      platform: 'linkedin',
      content: social.linkedin,
      status: 'scheduled',
      scheduled_at: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    }

    const { error: insertError } = await supabase
      .from('social_content_queue')
      .insert([...twitterInserts, linkedinInsert])

    if (insertError) throw insertError

    return new Response(
      JSON.stringify({ success: true, post_id: record.id, queued: twitterInserts.length + 1 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('generate-social-content error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
