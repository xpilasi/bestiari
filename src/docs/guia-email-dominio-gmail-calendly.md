# Guía: Email Corporativo + Gmail + Calendly para Web en Netlify
**Configuración con dominio propio en Hostinger**

> **Objetivo:** El cliente siempre ve el email corporativo (ej. `contacto@tudominio.com`), gestionado cómodamente desde Gmail con Google Calendar y Calendly para agendar reuniones.

---

## Requisitos previos

- Dominio propio registrado en **Hostinger**
- Cuenta de email corporativo activa en Hostinger (ej. `contacto@tudominio.com`)
- Web publicada en **Netlify**
- Cuenta de **Gmail/Google** existente
- Cuenta en **Calendly** (gratuita o de pago)

---

## Parte 1: Verificar configuración DNS en Hostinger

Antes de empezar, asegúrate de que estos registros DNS están presentes en el panel de Hostinger (**Dominios → DNS Zone**). Son necesarios para que el correo funcione correctamente y no vaya a spam.

| Tipo | Nombre | Contenido | Prioridad |
|------|--------|-----------|-----------|
| MX | @ | mx1.hostinger.com | 5 |
| MX | @ | mx2.hostinger.com | 10 |
| TXT | @ | `v=spf1 include:_spf.mail.hostinger.com ~all` | — |
| TXT | _dmarc | `v=DMARC1; p=none` | — |
| CNAME | hostingermail-a._domainkey | hostingermail-a.dkim.mail.hostinger.com | — |
| CNAME | hostingermail-b._domainkey | hostingermail-b.dkim.mail.hostinger.com | — |
| CNAME | hostingermail-c._domainkey | hostingermail-c.dkim.mail.hostinger.com | — |
| CNAME | autodiscover | autodiscover.mail.hostinger.com | — |
| CNAME | autoconfig | autoconfig.mail.hostinger.com | — |

> ✅ Si estos registros ya están presentes, no es necesario tocar nada en DNS.

---

## Parte 2: Activar la cuenta de email en Hostinger

1. Accede a [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Ve a **Emails → Administrar → Cuentas de Email**
3. Si la cuenta no existe, créala: introduce `contacto` como prefijo y establece una contraseña segura
4. Anota los datos SMTP/IMAP que aparecen en la sección de configuración:
   - **Servidor SMTP:** `smtp.hostinger.com` · Puerto `465` (SSL) o `587` (TLS)
   - **Servidor IMAP:** `imap.hostinger.com` · Puerto `993` (SSL)
   - **Servidor POP3:** `pop.hostinger.com` · Puerto `995` (SSL)
   - **Usuario:** la dirección completa, ej. `contacto@tudominio.com`

---

## Parte 3: Conectar el email corporativo a Gmail

### 3.1 — Configurar Gmail para RECIBIR correo (POP3)

Esto hace que los correos que lleguen a `contacto@tudominio.com` aparezcan en tu bandeja de Gmail.

1. Abre Gmail → **Configuración (⚙️) → Ver toda la configuración**
2. Ve a la pestaña **Cuentas e importación**
3. En la sección **"Consultar el correo de otras cuentas"** → clic en **"Agregar una cuenta de correo"**
4. Introduce `contacto@tudominio.com` → Siguiente
5. Selecciona **"Importar correos electrónicos de mi otra cuenta (POP3)"** → Siguiente
6. Rellena los datos:
   - **Servidor POP3:** `pop.hostinger.com`
   - **Puerto:** `995`
   - **Nombre de usuario:** `contacto@tudominio.com`
   - **Contraseña:** la de tu cuenta Hostinger
   - ✅ Marcar: **"Usar siempre una conexión segura (SSL)"**
   - ✅ Marcar: **"Dejar una copia del mensaje recuperado en el servidor"** (recomendado para no perder correos)
   - Opcional: ✅ **"Aplicar etiqueta"** para identificar estos correos fácilmente
7. Clic en **"Agregar cuenta"**

> ⚠️ Gmail comprueba el correo externo cada 30-60 minutos. Si necesitas recepción instantánea, configura también el reenvío automático desde el webmail de Hostinger hacia tu Gmail.

**Alternativa — Reenvío automático desde Hostinger:**
1. En hpanel.hostinger.com → **Emails → Reenvío de correo**
2. Crea una regla para reenviar todo el correo de `contacto@tudominio.com` a tu `tucuenta@gmail.com`
3. Combina esto con el paso 3.2 para tener respuesta inmediata y envío desde la dirección correcta

---

### 3.2 — Configurar Gmail para ENVIAR desde el email corporativo (SMTP)

Esto permite que cuando respondas desde Gmail, el destinatario vea `contacto@tudominio.com` como remitente.

1. En la misma pestaña **Cuentas e importación** de Gmail
2. En la sección **"Enviar correo como"** → clic en **"Agregar otra dirección de correo"**
3. Rellena:
   - **Nombre:** el nombre que verán los clientes (ej. `Tu Nombre | Bestiari`)
   - **Dirección:** `contacto@tudominio.com`
   - ✅ Marcar **"Tratar como alias"**
4. Clic en **"Siguiente paso"** → Rellena los datos SMTP:
   - **Servidor SMTP:** `smtp.hostinger.com`
   - **Puerto:** `465`
   - **Nombre de usuario:** `contacto@tudominio.com`
   - **Contraseña:** la de tu cuenta Hostinger
   - Seleccionar: **"Conexión segura mediante SSL"**
5. Clic en **"Agregar cuenta"**
6. Gmail enviará un **código de verificación** al buzón de Hostinger. Para leerlo:
   - Accede al webmail: [webmail.hostinger.com](https://webmail.hostinger.com)
   - Inicia sesión con `contacto@tudominio.com` y tu contraseña
   - Copia el código y pégalo en Gmail para confirmar

---

### 3.3 — Establecer el email corporativo como predeterminado

Para que **todos** tus correos salgan siempre desde `contacto@tudominio.com`:

1. En **Cuentas e importación → Enviar correo como**
2. Junto a `contacto@tudominio.com` → clic en **"Establecer como predeterminada"**

> ✅ A partir de aquí, cuando el cliente reciba un email tuyo verá `contacto@tudominio.com`, aunque lo hayas enviado desde Gmail.

---

## Parte 4: Conectar Google Calendar con Calendly

### 4.1 — Crear cuenta en Calendly

1. Ve a [calendly.com](https://calendly.com) → **Sign up with Google** (usa la misma cuenta Google que tienes configurada con el email corporativo)
2. En la configuración de perfil, pon el nombre que verán los clientes y tu zona horaria

### 4.2 — Conectar Google Calendar

1. En Calendly → **Integraciones → Calendar Connections**
2. Conecta tu **Google Calendar** → esto permite que Calendly:
   - Bloquee automáticamente los horarios en que ya tienes eventos
   - Añada las nuevas reuniones directamente a tu calendario

### 4.3 — Configurar tipo de evento

1. Ve a **Event Types → + New Event Type**
2. Configura:
   - **Nombre:** ej. "Consulta inicial gratuita"
   - **Duración:** 30 min (recomendado para primeras reuniones)
   - **Plataforma:** Google Meet, Zoom, o presencial
   - **Disponibilidad:** define tus horas disponibles
   - **Buffer:** añade 10-15 min entre reuniones para evitar solapamientos
3. En **Notifications & Cancellation Policy:**
   - Activa recordatorios automáticos por email (24h y 1h antes)
   - Configura el email de confirmación que recibirá el cliente

> 📧 **Nota sobre el email en Calendly:** En el plan gratuito, las notificaciones salen desde un email de Calendly pero con tu nombre. En planes de pago (Standard+) puedes conectar tu propio dominio SMTP para que salgan desde `contacto@tudominio.com`.

---

## Parte 5: Integrar Calendly en la web de Netlify

Tienes tres opciones de integración. Elige según el diseño de tu web:

### Opción A — Popup (recomendada) ✅

El calendario se abre como ventana emergente al hacer clic en un botón. Mínima invasión en el diseño.

```html
<!-- Añade en el <head> de tu web -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>

<!-- Botón en cualquier parte de tu web -->
<button 
  onclick="Calendly.initPopupWidget({url: 'https://calendly.com/TU-USUARIO/TU-EVENTO'});return false;"
  style="background:#0069ff; color:white; padding:12px 24px; border:none; border-radius:6px; cursor:pointer; font-size:16px;">
  Agendar una reunión
</button>
```

### Opción B — Inline (incrustado en página)

El calendario aparece directamente en la página, sin popup.

```html
<!-- Donde quieras mostrar el calendario -->
<div 
  class="calendly-inline-widget" 
  data-url="https://calendly.com/TU-USUARIO/TU-EVENTO" 
  style="min-width:320px; height:630px;">
</div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Opción C — Redirección directa

La opción más simple: un enlace que lleva al cliente a tu página de Calendly.

```html
<a href="https://calendly.com/TU-USUARIO/TU-EVENTO" target="_blank">
  Agendar una reunión →
</a>
```

---

### Personalizar la URL de Calendly

En Calendly → **Account Settings → Profile** puedes personalizar tu URL:
`https://calendly.com/bestiari` (en lugar de la URL genérica con números)

Esto queda mucho más profesional al compartirlo con clientes.

---

## Parte 6: Flujo completo del cliente

```
Cliente visita tudominio.com
        ↓
Hace clic en "Agendar reunión"
        ↓
Se abre Calendly → elige día y hora
        ↓
Recibe confirmación por email automática
        ↓
La reunión aparece en tu Google Calendar
        ↓
Si escribe a contacto@tudominio.com
        ↓
Recibes en Gmail · Respondes desde Gmail
        ↓
El cliente siempre ve contacto@tudominio.com
```

---

## Resumen de herramientas y costes

| Herramienta | Plan mínimo | Coste | Función |
|-------------|-------------|-------|---------|
| Hostinger Email | Business Email | ~12€/año | Buzón corporativo |
| Gmail | Gratuito | 0€ | Cliente de correo |
| Google Calendar | Gratuito | 0€ | Gestión de agenda |
| Calendly | Gratuito | 0€ | Agendado online (1 tipo de evento) |
| Netlify | Gratuito | 0€ | Hosting web |

> Para enviar emails de Calendly desde tu propio dominio necesitas Calendly **Standard** (~10$/mes).

---

## Solución de problemas comunes

**El correo no llega a Gmail**
→ Verifica que los registros MX en Hostinger están correctos. Espera hasta 24h si acabas de configurar el DNS.

**Gmail muestra "via gmail.com" al enviar**
→ Es normal en algunos clientes. Para eliminarlo completamente necesitas un plan Google Workspace o usar Hostinger webmail para envíos críticos.

**Calendly no bloquea mis eventos de Google Calendar**
→ Asegúrate de que en Calendly → Calendar Connections tienes seleccionado el calendario correcto para "Check for conflicts".

**El widget de Calendly no carga en la web**
→ Verifica que el script se carga correctamente. Revisa la consola del navegador (F12) por posibles errores de CSP (Content Security Policy) en los headers de Netlify.

---

*Guía creada para configuraciones estándar con Hostinger + Netlify + Gmail + Calendly · Actualizar si cambian las interfaces de las plataformas.*
