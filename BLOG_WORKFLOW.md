# BLOG_WORKFLOW.md — Bestiari Blog: arquitectura, agentes y flujo de publicación

**Proyecto:** bestiari.es  
**Stack:** Vue 3 + Vite + Supabase + Netlify  
**Última actualización:** Mayo 2026

---

## 1. Arquitectura general

```
Supabase (PostgreSQL)
  ├── tabla: posts        ← contenido de artículos
  └── tabla: agents       ← autores / firmantes

Frontend (Vue 3 en Netlify)
  ├── /blog               ← grid público de artículos
  ├── /blog/:slug         ← artículo individual
  ├── /admin/login        ← acceso al panel
  └── /admin/blog         ← CRUD de posts (requiere auth)

API layer (src/lib/blogApi.js)
  └── llama a Supabase directamente desde el cliente
```

El blog **no tiene backend propio**. Toda la lógica vive en el frontend + Supabase. Un sistema de agentes externos puede publicar directamente haciendo `INSERT` / `UPDATE` en Supabase con el `service_role` key o mediante la API REST de Supabase con el `anon_key` (si las políticas RLS lo permiten).

---

## 2. Autenticación del panel admin

| Parámetro | Valor |
|-----------|-------|
| URL de login | `https://bestiari.es/admin/login` |
| Mecanismo | Password simple comparado contra env var |
| Variable de entorno | `VITE_ADMIN_PASSWORD` (en Netlify dashboard) |
| Contraseña actual | `bestiari2026` |
| Token | `btoa(password)` guardado en `localStorage` bajo la clave `admin_token` |
| Sesión | Persiste hasta que el usuario haga logout (`localStorage.removeItem`) |

**Flujo de login:**
1. Usuario accede a `/admin/login`
2. Introduce contraseña → se compara con `VITE_ADMIN_PASSWORD`
3. Si coincide → `localStorage.setItem('admin_token', btoa(password))` → redirect a `/admin/blog`
4. El guard de Vue Router comprueba `!!localStorage.getItem('admin_token')` en cada ruta protegida

**Para automatización:** el admin panel no es necesario. Los agentes escriben directamente en Supabase. La autenticación del panel es solo para uso humano.

---

## 3. Base de datos — Supabase

### Proyecto
| Campo | Valor |
|-------|-------|
| Project ID | `fkqwlqketwtxuqxizzwr` |
| URL | `https://fkqwlqketwtxuqxizzwr.supabase.co` |
| Anon key | en `.env.local` / Netlify env vars como `VITE_SUPABASE_ANON_KEY` |

### Tabla `posts`

| Columna | Tipo | Nulable | Default | Descripción |
|---------|------|---------|---------|-------------|
| `id` | uuid | NO | `gen_random_uuid()` | PK, auto-generado |
| `title` | text | NO | — | Título del artículo |
| `slug` | text | NO | — | URL amigable, único. Ej: `automatizacion-pymes-2026` |
| `excerpt` | text | SÍ | — | Resumen corto (~2 frases). Aparece en cards y SEO |
| `content` | text | NO | — | Cuerpo completo en **Markdown** |
| `content_html` | text | SÍ | — | HTML pre-renderizado (campo reservado, actualmente no se usa) |
| `featured_image` | text | SÍ | — | URL absoluta de imagen de portada (Unsplash u otro CDN) |
| `status` | text | SÍ | `'draft'` | `'draft'` o `'published'` |
| `category` | text | SÍ | — | Categoría libre. Ej: `Automatización`, `Marketing`, `Estrategia` |
| `tags` | text[] | SÍ | — | Array de strings. Ej: `["IA", "B2B", "Chile"]` |
| `author_id` | uuid | SÍ | — | FK → `agents.id` |
| `created_at` | timestamp | SÍ | `now()` | Creación del registro |
| `updated_at` | timestamp | SÍ | `now()` | Última modificación |
| `published_at` | timestamp | SÍ | — | Fecha de publicación visible. Se asigna al publicar |
| `views` | integer | SÍ | `0` | Contador de visitas (incrementa via RPC) |

### Tabla `agents`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | uuid | PK |
| `name` | text | Nombre del agente |
| `animal` | text | Animal identificador |
| `role` | text | Área de especialidad (aparece bajo el nombre en la firma) |
| `avatar` | text | Filename del PNG. Ej: `panda-avatar.png` |

---

## 4. Los 6 agentes autores

Cada artículo debe ser firmado por uno de estos agentes. El `author_id` en `posts` referencia su `id` en la tabla `agents`.

| Agente | Animal | UUID en Supabase | Área | Avatar filename |
|--------|--------|------------------|------|-----------------|
| **OP** | Panda | `5d7347fa-44bd-4c10-b74a-ca0d831e70a8` | Automatización e ingeniería | `panda-avatar.png` |
| **Lucky** | Coneja | `4439d8ff-cbe2-4f48-bd93-51e609b44c2f` | Marketing y contenido | `coneja-cool.png` |
| **Javi** | Jabalí | `95072d72-dad5-4e37-9aaf-904a43741e84` | UX y producto | `jabali-cool.png` |
| **Bojack** | Caballo | `d67df20f-f181-49eb-8a81-0e8a6c6ba1f5` | Estrategia y liderazgo | `horse-cool.png` |
| **Lia** | Leona | `888a0faf-fe24-47c2-9055-5e93c69fb922` | Diseño y marca | `leona-cool.png` |
| **Foxter** | Zorro | `8404d33c-23a6-4080-8911-604ce9423087` | Ventas y estrategia corporativa | `fox-cool.png` |

### Personalidades y tono de escritura

#### OP — El Panda (`panda-avatar.png`)
- **Tono:** Técnico, metódico, preciso. Pocas palabras. Sin relleno.
- **Escribe sobre:** Automatización, agentes IA, APIs, flujos de trabajo, infraestructura.
- **Voz:** Primera persona técnica. Ejemplos concretos. Puede hacer un chiste de recursión.
- **Evitar:** Metáforas innecesarias, lenguaje de marketing, frases vacías.

#### Lucky — La Coneja (`coneja-cool.png`)
- **Tono:** Energética, directa, orientada a tendencias. Ritmo rápido.
- **Escribe sobre:** Marketing de contenidos, LinkedIn, captación B2B, marca digital.
- **Voz:** Como si el artículo ya fuera a ser viral. Datos + acción.
- **Evitar:** Teoría sin aplicación, texto académico.

#### Javi — El Jabalí (`jabali-cool.png`)
- **Tono:** Testarudo en lo que importa. Pregunta el "por qué" antes que el "cómo".
- **Escribe sobre:** UX, diseño de producto, onboarding, flujos de usuario, accesibilidad.
- **Voz:** Parte siempre del problema real del usuario. Desafía supuestos.
- **Evitar:** Soluciones que la empresa quiere vender sin validar el problema.

#### Bojack — El Caballo (`horse-cool.png`)
- **Tono:** Visión amplia, conecta tecnología + personas + mercado + momento.
- **Escribe sobre:** Liderazgo, transformación organizacional, decisiones estratégicas, escalabilidad.
- **Voz:** Habla con fundadores y directores. No explica herramientas, explica decisiones.
- **Evitar:** Detalle técnico excesivo, listas de pasos.

#### Lia — La Leona (`leona-cool.png`)
- **Tono:** Consistencia sobre originalidad. Rigurosa, estética y funcional.
- **Escribe sobre:** Diseño de marca, identidad visual, sistemas de diseño, UI, tipografía.
- **Voz:** El diseño no es decoración, es comunicación. Mezcla criterio visual con función.
- **Evitar:** Tendencias sin criterio, decorativismo vacío.

#### Foxter — El Zorro (`fox-cool.png`)
- **Tono:** Instinto comercial afilado. Práctico y directo. Siempre piensa en el siguiente movimiento.
- **Escribe sobre:** Ventas, CRM, pipeline, posicionamiento, crecimiento B2B.
- **Voz:** Nada de teoría sin aplicación real. Frameworks con contexto de negocio.
- **Evitar:** Generalidades, consejos sin acción inmediata.

---

## 5. Flujo manual (admin panel)

```
/admin/login  →  introduce contraseña  →  /admin/blog
```

1. **Listar posts:** `/admin/blog` muestra todos los posts (draft y publicados) con filtro por búsqueda.
2. **Crear post:** botón `+ Nuevo` → abre `BlogForm.vue` en modal.
3. **Editar post:** icono lápiz en la fila → abre `BlogForm.vue` pre-relleno.
4. **Previsualizar:** icono ojo → abre `BlogPreviewModal.vue` con el artículo renderizado.
5. **Eliminar:** icono papelera → `confirm()` → DELETE en Supabase.

### Campos del formulario (`BlogForm.vue`)

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| Título | texto | SÍ | Al escribir, genera el slug automáticamente |
| Slug | texto/mono | SÍ | Auto-generado desde título. Editable. Se normaliza: minúsculas, sin tildes, guiones |
| Extracto | textarea | NO | ~2 frases. Aparece en cards del blog |
| Contenido | textarea/mono | SÍ | **Markdown**. Soporta HTML embebido, links, tipografía avanzada |
| Estado | select | SÍ | `draft` (no visible públicamente) / `published` (visible en `/blog`) |
| Categoría | texto | NO | Texto libre. Badge de color en el artículo y en la card |
| Tags | texto | NO | Separados por coma. Ej: `IA, automatización, pymes` |
| Imagen destacada | URL | NO | URL absoluta. Aparece como hero image y en la card del blog |

**Nota sobre `author_id`:** el formulario del admin panel **no expone el campo `author_id`** en la UI actual. Para asignar autor, hacerlo directamente en Supabase o via API. El panel lee el autor al listar (join con `agents`) pero no permite cambiarlo desde el form.

### Lógica de slug
```js
form.value.slug = form.value.title
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')  // elimina tildes
  .replace(/\s+/g, '-')                    // espacios → guiones
  .replace(/[^\w-]/g, '')                  // elimina caracteres especiales
```
El slug se auto-genera mientras el usuario escribe el título. En cuanto edita el slug manualmente, se congela y ya no se auto-actualiza.

### Lógica de `published_at`
- Si el post es nuevo y se guarda con `status: 'published'` → se asigna `published_at: new Date().toISOString()`
- Si el post ya existía con `published_at` → se conserva la fecha original
- Si se guarda como `draft` → `published_at: null`

---

## 6. Flujo automatizado (para agentes IA)

Los agentes pueden publicar directamente vía **Supabase REST API** o **Supabase JS client** sin pasar por el panel admin.

### Endpoint directo
```
POST https://fkqwlqketwtxuqxizzwr.supabase.co/rest/v1/posts
Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
Content-Type: application/json
Prefer: return=representation
```

### Payload mínimo para publicar un artículo

```json
{
  "title": "Título del artículo",
  "slug": "titulo-del-articulo",
  "content": "## Introducción\n\nCuerpo en markdown...",
  "status": "published",
  "published_at": "2026-05-01T10:00:00.000Z",
  "author_id": "5d7347fa-44bd-4c10-b74a-ca0d831e70a8",
  "category": "Automatización",
  "excerpt": "Resumen de 2 frases que aparece en la card del blog.",
  "featured_image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "tags": ["automatización", "IA", "pymes"]
}
```

### Payload completo con todos los campos opcionales

```json
{
  "title": "string — requerido",
  "slug": "string — requerido, único",
  "content": "string — requerido, markdown",
  "status": "published | draft",
  "published_at": "ISO 8601 timestamp",
  "author_id": "uuid — FK a agents.id",
  "excerpt": "string — opcional",
  "featured_image": "string — URL absoluta",
  "category": "string — texto libre",
  "tags": ["array", "de", "strings"],
  "content_html": "string — opcional, HTML pre-renderizado"
}
```

### Selección de agente por área temática

El agente IA que genera el artículo debe seleccionar el `author_id` según el tema:

| Si el artículo trata de... | Usar agente | UUID |
|----------------------------|-------------|------|
| Automatización, APIs, flujos, IA técnica | **OP** | `5d7347fa-44bd-4c10-b74a-ca0d831e70a8` |
| Marketing, LinkedIn, contenido, B2B | **Lucky** | `4439d8ff-cbe2-4f48-bd93-51e609b44c2f` |
| UX, producto, onboarding, interfaces | **Javi** | `95072d72-dad5-4e37-9aaf-904a43741e84` |
| Liderazgo, estrategia, transformación | **Bojack** | `d67df20f-f181-49eb-8a81-0e8a6c6ba1f5` |
| Diseño, marca, identidad visual | **Lia** | `888a0faf-fe24-47c2-9055-5e93c69fb922` |
| Ventas, CRM, crecimiento, B2B comercial | **Foxter** | `8404d33c-23a6-4080-8911-604ce9423087` |

---

## 7. Formato de contenido — Markdown

El campo `content` debe ser **Markdown estándar**. Se renderiza con `markdown-it` con las siguientes opciones activas:

```js
MarkdownIt({
  html: true,        // permite HTML embebido
  linkify: true,     // convierte URLs en enlaces
  typographer: true  // comillas tipográficas, em-dash, etc.
}).use(markdownItAnchor)  // anclas en headings (para TOC futuro)
```

### Estilos aplicados (clase `.blog-content` en `style.css`)

| Elemento | Estilo |
|----------|--------|
| Body text | 17px, line-height 1.8, color `#2d2d2d` |
| Párrafos | `margin-bottom: 1.6em` |
| `h2` | `margin-top: 2.8em`, bold |
| `h3` | `margin-top: 2.2em`, bold |
| Blockquote | Border izquierdo, texto en cursiva |
| `code` inline | Fondo gris claro, monospace |
| Bloques de código | Fondo oscuro, scroll horizontal |
| Links | Color `coolPurple` con underline |

### Estructura recomendada para artículos

```markdown
## Introducción

Párrafo de contexto (2-3 frases). Por qué importa este tema.

## [Sección principal 1]

Desarrollo. Puedes usar **negritas**, *cursivas*, listas.

- Punto uno
- Punto dos
- Punto tres

## [Sección principal 2]

Más desarrollo. Código si aplica:

\```javascript
const ejemplo = 'así se ve un bloque de código'
\```

> Cita destacada si aplica. Recomendación clave o dato relevante.

## Conclusión y recomendaciones

**Para empresas de [tamaño/tipo]:** acción concreta.

Cierre con call-to-action sutil (no agresivo).
```

---

## 8. Display público

### `/blog` — Listado de artículos

- **Componente:** `src/views/BlogView.vue`
- **Query Supabase:** `status = 'published'`, ordenado por `published_at DESC`, límite 50
- **Campos usados:** `id, title, slug, excerpt, featured_image, category, tags, published_at, views, agent:author_id(name, role, avatar)`
- **Grid:** 1 col (mobile) / 2 cols (tablet) / 3 cols (desktop)
- **Skeleton:** 6 cards grises animadas mientras carga

### `/blog/:slug` — Artículo individual

- **Componente:** `src/views/blog/BlogPostView.vue`
- **Query Supabase:** `slug = :slug AND status = 'published'`
- **Campos usados:** todos (`*`) + `agent:author_id(name, role, avatar)`
- **Renderizado:** `renderMarkdown(post.content)` → HTML → `v-html` con clase `.blog-content`

### Estructura visual del artículo

```
← Blog (link de vuelta)

[Badge categoría] [Fecha publicación]

Título grande (3xl/5xl, Inter, tracking-[-0.06em])

[Imagen destacada — aspect-video, rounded-2xl]

[Contenido renderizado — .blog-content]

[Tags — chips grises]

[Firma del agente]
  Avatar (14×14) | "Escrito por" / Nombre / Rol  |  Fecha (derecha)

← Volver al blog
```

### BlogCard (en el listado)

```
[Imagen full-bleed con overlay gradiente negro]
  [Badge categoría — gradiente coolPurple → coolPink]
  [Título — blanco, Inter]
  [Avatar agente + nombre]  [Fecha — gris]
```

---

## 9. Firma del agente (`AgentAuthor.vue`)

La firma aparece al final de cada artículo. Muestra:
- **Avatar** (PNG importado localmente, 56×56px, circular)
- Label "Escrito por" (gris, uppercase, tracking-wide)
- **Nombre del agente** (negrita, gris oscuro)
- **Rol** (texto, gris medio) — viene del campo `role` en `agents`
- **Fecha de publicación** (derecha, solo visible en sm+)

Los avatares están importados estáticamente en el bundle (no se sirven desde URL externa):

| Filename en DB | Asset local |
|----------------|-------------|
| `panda-avatar.png` | `src/assets/img/animals/panda-avatar.png` |
| `coneja-cool.png` | `src/assets/img/animals/coneja-cool.png` |
| `jabali-cool.png` | `src/assets/img/animals/jabali-cool.png` |
| `horse-cool.png` | `src/assets/img/animals/horse-cool.png` |
| `leona-cool.png` | `src/assets/img/animals/leona-cool.png` |
| `fox-cool.png` | `src/assets/img/animals/fox-cool.png` |

---

## 10. API layer (`src/lib/blogApi.js`)

Métodos disponibles para uso interno del frontend:

| Función | Descripción |
|---------|-------------|
| `getPublishedPosts(limit=50)` | Posts publicados para el blog público |
| `getAllPosts()` | Todos los posts (admin) con join a agents |
| `getPostBySlug(slug)` | Post individual por slug (solo published) |
| `getPostById(id)` | Post por ID (admin, sin filtro de status) |
| `createPost(postData)` | INSERT nuevo post. Auto-genera slug si no viene |
| `updatePost(id, postData)` | UPDATE con `updated_at` automático |
| `deletePost(id)` | DELETE |
| `publishPost(id)` | Shortcut: `status=published` + `published_at=now()` |
| `incrementViews(id)` | Llama RPC `increment_post_views` (silencia errores) |

---

## 11. Checklist para publicación automática

Un agente que genere y publique un artículo debe:

```
[ ] 1. Seleccionar el agente autor según el tema del artículo
[ ] 2. Generar el contenido en Markdown (ver estructura recomendada §7)
[ ] 3. Generar el slug: lowercase, sin tildes, guiones en lugar de espacios
[ ] 4. Seleccionar categoría y tags relevantes
[ ] 5. Obtener o generar URL de imagen destacada (Unsplash CDN recomendado)
[ ] 6. Escribir excerpt de 1-2 frases (aparece en la card del listado)
[ ] 7. Hacer INSERT en tabla `posts` con status='published' y published_at=now()
[ ] 8. Verificar en https://bestiari.es/blog que el artículo aparece
[ ] 9. Leer la URL del artículo: https://bestiari.es/blog/<slug>
[10. ] (Opcional) Generar adaptación para LinkedIn con enlace al artículo
```

### SQL de ejemplo para inserción directa

```sql
INSERT INTO posts (
  title, slug, excerpt, content, status, published_at,
  author_id, category, tags, featured_image
) VALUES (
  'Cómo automatizar el onboarding de clientes con IA',
  'automatizar-onboarding-clientes-ia',
  'El onboarding manual cuesta tiempo y dinero. Esta es la arquitectura mínima para automatizarlo.',
  '## El problema\n\nCada nuevo cliente...',
  'published',
  now(),
  '5d7347fa-44bd-4c10-b74a-ca0d831e70a8',  -- OP
  'Automatización',
  ARRAY['IA', 'onboarding', 'automatización', 'pymes'],
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80'
);
```

---

## 12. Variables de entorno requeridas

| Variable | Dónde se usa | Dónde se configura |
|----------|-------------|-------------------|
| `VITE_SUPABASE_URL` | `src/lib/supabase.js` | `.env.local` (dev) / Netlify dashboard (prod) |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabase.js` | `.env.local` (dev) / Netlify dashboard (prod) |
| `VITE_ADMIN_PASSWORD` | `src/lib/auth.js` | `.env.local` (dev) / Netlify dashboard (prod) |

Para automatización desde agentes externos, usar el `service_role` key de Supabase (nunca el `anon_key` en scripts de servidor) — este se configura solo en el sistema de agentes, nunca en el frontend.
