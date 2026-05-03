# Arquitectura del Proyecto — Dónde vive cada cosa

> Documento de referencia técnica y comercial para el equipo Bestiari.
> Útil para explicar la arquitectura a clientes que contraten servicios similares.

---

## 🧑‍💼 VERSIÓN NO-TÉCNICA
### Para explicar a clientes sin conocimiento técnico

### ¿Cómo funciona un proyecto web moderno?

Imagina que tu negocio tiene tres espacios físicos:

**1. La tienda (Frontend — Netlify)**
Es lo que el cliente ve y toca: la web, los botones, los formularios, las páginas. Está alojada en Netlify, que es como el local comercial donde la gente entra. Cada vez que alguien visita `bestiari.es`, está visitando este "local".

**2. El almacén (Base de datos — Supabase)**
Es donde se guarda toda la información: posts del blog, usuarios, configuraciones. Nadie lo ve directamente, pero todo lo que aparece en la tienda viene de aquí. Supabase es el proveedor de este almacén.

**3. Los empleados automatizados (Edge Functions — Supabase)**
Son pequeños programas que hacen tareas automáticas en segundo plano: enviar un email cuando se crea un post, generar contenido para redes sociales, procesar una aprobación. Viven en los servidores de Supabase y se activan solos cuando pasa algo concreto.

### ¿Qué son las "variables de entorno" o "secrets"?

Son como las llaves del negocio. Cada servicio externo (el servicio de email, la IA, la base de datos) te da una llave privada para poder usarlo. Esas llaves:

- **No se guardan en el código** (sería como dejar las llaves colgadas en la puerta)
- Se guardan en el panel de configuración de cada servicio
- Solo las personas autorizadas las conocen

**Ejemplo práctico:**
Para que el sistema pueda enviar emails automáticos, necesita la "llave" del servicio de email (Resend). Esa llave se guarda en el panel de Supabase — no en el código que cualquiera puede ver en GitHub.

### ¿Por qué hay diferentes "lugares" para las llaves?

Cada servicio solo puede leer sus propias llaves:

- Netlify (la tienda) solo lee las llaves que le damos a Netlify
- Supabase (el almacén + empleados) solo lee las llaves que le damos a Supabase
- GitHub Actions (tareas programadas) solo lee las llaves que le damos a GitHub

Es como si el empleado de la tienda tuviera las llaves de la caja registradora, pero no las del almacén. Cada uno tiene solo lo que necesita.

---

## 👨‍💻 VERSIÓN TÉCNICA
### Para desarrolladores y decisiones de arquitectura

### Stack completo

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                         │
│                  bestiari.es (browser)                   │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP
┌──────────────────────▼──────────────────────────────────┐
│                   NETLIFY (CDN)                          │
│           Frontend Vue 3 + Vite + Tailwind               │
│                                                          │
│  Variables disponibles (VITE_*):                         │
│  • VITE_SUPABASE_URL                                     │
│  • VITE_SUPABASE_ANON_KEY                                │
│                                                          │
│  Origen del código: GitHub → xpilasi/bestiari (main)     │
│  Deploy: automático en cada push a main                  │
└──────────────────────┬──────────────────────────────────┘
                       │ Supabase JS Client
┌──────────────────────▼──────────────────────────────────┐
│                  SUPABASE                                │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  PostgreSQL (Base de datos)                      │    │
│  │  Tablas: posts, agents, approval_tokens,         │    │
│  │          social_content_queue                    │    │
│  │  RLS: Row Level Security activado                │    │
│  │  RPC Functions: handle_approval()                │    │
│  └────────────────────┬────────────────────────────┘    │
│                       │ Webhooks (INSERT/UPDATE)         │
│  ┌────────────────────▼────────────────────────────┐    │
│  │  Edge Functions (Deno runtime)                   │    │
│  │  • send-approval-email                           │    │
│  │  • generate-social-content                       │    │
│  │                                                  │    │
│  │  Secrets disponibles:                            │    │
│  │  • RESEND_API_KEY                                │    │
│  │  • SUPABASE_URL                                  │    │
│  │  • SUPABASE_SERVICE_ROLE_KEY                     │    │
│  │  • ANTHROPIC_API_KEY (FASE 2)                    │    │
│  │  • SITE_URL                                      │    │
│  └────────────────────────────────────────────────-┘    │
└──────────────────────────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              GITHUB ACTIONS (FASE 3)                     │
│           Cron job: 9 AM UTC diario                      │
│           Python script → Twitter + LinkedIn             │
│                                                          │
│  Secrets disponibles:                                    │
│  • SUPABASE_URL + SUPABASE_SECRET_KEY                    │
│  • TWITTER_* (bearer, api_key, access_token)             │
│  • LINKEDIN_ACCESS_TOKEN                                 │
└──────────────────────────────────────────────────────────┘
```

---

### Regla de oro: ¿Dónde van las variables de entorno?

| Variable | Entorno de ejecución | Dónde se declara |
|----------|---------------------|------------------|
| `VITE_SUPABASE_URL` | Browser (Vue) | `.env.local` + Netlify env vars |
| `VITE_SUPABASE_ANON_KEY` | Browser (Vue) | `.env.local` + Netlify env vars |
| `RESEND_API_KEY` | Deno (Supabase Edge) | Supabase Secrets |
| `SUPABASE_SERVICE_ROLE_KEY` | Deno (Supabase Edge) | Supabase Secrets |
| `ANTHROPIC_API_KEY` | Deno (Supabase Edge) | Supabase Secrets |
| `SITE_URL` | Deno (Supabase Edge) | Supabase Secrets |
| `TWITTER_BEARER_TOKEN` | Python (GitHub Actions) | GitHub Secrets |
| `LINKEDIN_ACCESS_TOKEN` | Python (GitHub Actions) | GitHub Secrets |

**Regla simple:** La variable va donde corre el código que la consume.
- Vue corre en el browser → Netlify
- Edge Functions corren en Deno/Supabase → Supabase Secrets
- Scripts de Python corren en GitHub Actions → GitHub Secrets
- Nunca en el código fuente ni en archivos que se suban a GitHub

---

### Flujo de datos completo (blog automation)

```
[Agente IA vía MCP Supabase]
    ↓
    INSERT posts (status='draft')
    ↓
[Supabase Webhook — trigger INSERT]
    ↓
[Edge Function: send-approval-email]
    ├─ Genera 2 tokens únicos (approve/reject)
    ├─ INSERT approval_tokens
    └─ POST api.resend.com → email a bestiariagencia@gmail.com
                                    ↓
                          [Xavi abre email]
                          [Click en ✅ Aprobar]
                                    ↓
                    GET /api/approve?token=xxx
                                    ↓
                    [ApproveView.vue]
                    supabase.rpc('handle_approval')
                                    ↓
                    UPDATE posts SET status='published'
                                    ↓
[Supabase Webhook — trigger UPDATE]
    ↓
[Edge Function: generate-social-content]
    ├─ GET agents WHERE id = post.agent_id
    ├─ POST api.anthropic.com (Claude API)
    │   └─ Genera tweets + LinkedIn con voz del agente
    └─ INSERT social_content_queue (status='scheduled')
                                    ↓
[GitHub Actions — cron 9 AM UTC]
    ↓
[scripts/post_to_social.py]
    ├─ SELECT social_content_queue WHERE status='scheduled'
    ├─ POST api.twitter.com (Tweepy)
    ├─ POST api.linkedin.com
    └─ UPDATE social_content_queue SET status='posted'
```

---

### ¿Por qué este stack y no otro?

| Decisión | Alternativa descartada | Razón |
|----------|----------------------|-------|
| Supabase Edge Functions | Netlify Functions | Supabase ya tiene los webhooks nativos. Menos latencia, sin dependencia extra |
| GitHub Actions para posting | Cron en servidor propio | Gratis, fiable, zero mantenimiento |
| Resend para emails | SendGrid, Mailgun | Free tier más generoso, API más simple, mejor DX |
| Supabase Secrets | Variables en código | Seguridad. Las keys nunca deben estar en el repositorio |
| RPC Function para approval | Netlify Function | El handler vive en Supabase donde están los datos. Menos moving parts |

---

### Costos estimados del sistema completo

| Servicio | Plan | Costo |
|----------|------|-------|
| Netlify | Free | €0 |
| Supabase | Free | €0 |
| Resend | Free (3.000 emails/mes) | €0 |
| GitHub Actions | Free (2.000 min/mes) | €0 |
| Anthropic API | Pay-per-use (~€0.01-0.05/post) | ~€0.50/mes (10 posts) |
| Twitter API | Free (Basic posting) | €0 |
| LinkedIn API | Free | €0 |
| **TOTAL** | | **~€0.50/mes** |

---

### Seguridad: qué protegemos y cómo

1. **Keys nunca en GitHub** — `.env.local` en `.gitignore`, secrets en los paneles de cada servicio
2. **Tokens de aprobación de un solo uso** — expiran en 7 días, se invalidan tras usarse
3. **Service Role Key solo en Edge Functions** — el frontend usa la Anon Key (permisos limitados)
4. **RLS en Supabase** — las tablas solo son accesibles con autenticación
5. **verify_jwt: false solo en webhooks** — las Edge Functions de webhooks no requieren JWT porque las llama Supabase internamente

---

### Archivos clave en el repositorio

```
xpilasi/bestiari/
├── src/
│   ├── views/
│   │   └── ApproveView.vue          ← Página /api/approve?token=xxx
│   └── router/index.js              ← Añadir ruta /api/approve
├── supabase/
│   ├── functions/
│   │   ├── send-approval-email/
│   │   │   └── index.ts             ← Edge Function: email approval
│   │   └── generate-social-content/
│   │       └── index.ts             ← Edge Function: social content
│   └── migrations/
│       └── 20260501_approval_system.sql  ← DDL tablas + RPC
├── .github/
│   └── workflows/
│       └── post-to-social.yml       ← FASE 3: GitHub Actions (pendiente)
├── scripts/
│   └── post_to_social.py            ← FASE 3: Python poster (pendiente)
├── .env.example                     ← Template sin valores reales
├── .gitignore                       ← Incluye *.local
└── docs/
    ├── ARQUITECTURA_DONDE_VIVE_CADA_COSA.md  ← Este archivo
    └── SETUP_FASE1.md               ← Instrucciones de setup FASE 1
```
