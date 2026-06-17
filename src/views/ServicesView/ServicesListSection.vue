<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SectionSubTitle from '@/components/SectionSubTitle.vue'
import { Boxes, Globe, Smartphone, Check, ArrowRight, Sparkles } from 'lucide-vue-next'

export default {
  name: 'ServicesListSection',
  components: {
    SectionTitle,
    SectionSubTitle,
    Boxes,
    Globe,
    Smartphone,
    Check,
    ArrowRight,
    Sparkles
  },
  data() {
    return {
      sectionTitle: 'Lo que hacemos por tu negocio',
      highlightedWord: 'negocio',
      sectionSubtitle: 'Construimos software hecho a la medida de cómo trabaja tu empresa. Nada de plantillas: cada solución resuelve un problema real de tu operación.',

      // Servicio estrella (SaaS / Web App)
      hero: {
        badge: 'Producto estrella',
        title: 'SaaS y Web Apps a medida',
        tagline: 'Plataformas de gestión que ordenan, automatizan y hacen crecer tu negocio.',
        problem: 'Hojas de cálculo que se rompen, procesos manuales que comen horas, información dispersa en mil sitios y un equipo que no escala con la operación.',
        solution: 'Diseñamos y desarrollamos tu propia plataforma de gestión: paneles en tiempo real, automatizaciones a tu medida e integraciones con las herramientas que ya usas. Software que trabaja como tú.',
        deliverables: [
          'Paneles de gestión y métricas en tiempo real',
          'Automatización de procesos y tareas repetitivas',
          'Reservas, agendas, inventarios o flujos a medida',
          'Roles, permisos y multiusuario',
          'Integraciones (pagos, CRM, APIs externas)',
          'Infraestructura en la nube, segura y escalable'
        ]
      },

      // Servicios secundarios
      services: [
        {
          icon: 'Globe',
          title: 'Sitios comerciales premium',
          tagline: 'Tu presencia digital, rápida, cuidada y lista para convertir.',
          problem: 'Una web lenta, anticuada o que no transmite la calidad de lo que haces te cuesta clientes cada día.',
          solution: 'Sitios de alta calidad, veloces y optimizados para Google, con un diseño que enamora y refleja tu marca. Más rápidos y económicos que un desarrollo a medida, sin renunciar a la excelencia.',
          deliverables: [
            'Diseño premium alineado a tu marca',
            'Optimizado para SEO y velocidad',
            'Responsive y mobile-first',
            'Fácil de actualizar'
          ],
          gradient: 'from-orange-500 via-pink-500 to-rose-500'
        },
        {
          icon: 'Smartphone',
          title: 'Apps móviles',
          tagline: 'Tu producto en el bolsillo de tus clientes, cuando se necesita.',
          problem: 'Hay experiencias que solo brillan en el móvil: notificaciones, uso offline, geolocalización o cámara.',
          solution: 'Cuando el proyecto lo pide, desarrollamos apps móviles nativas para iOS y Android con una experiencia fluida y memorable, conectadas a tu plataforma.',
          deliverables: [
            'iOS y Android',
            'Notificaciones push',
            'Funciones nativas (GPS, cámara, offline)',
            'Conectada a tu backend'
          ],
          gradient: 'from-blue-500 via-indigo-500 to-purple-600'
        }
      ]
    }
  },
  methods: {
    handleContactClick() {
      window.dispatchEvent(new CustomEvent('open-contact-modal'))
    },
    handleMeetingClick() {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/bestiariagencia/30min' })
      }
    }
  }
}
</script>

<template>
  <section id="services-list" class="py-16 lg:py-24">

    <!-- Título -->
    <div class="text-center mb-16 flex flex-col items-center gap-6">
      <SectionTitle
        :title="sectionTitle"
        :highlighted-word="highlightedWord"
        alignment="center"
      />
      <SectionSubTitle
        :subtitle="sectionSubtitle"
        alignment="center"
        subtitle-color="text-gray-600"
        subtitle-size="text-lg"
        max-width="max-w-2xl"
      />
    </div>

    <!-- Servicio estrella: SaaS / Web App -->
    <div class="relative rounded-3xl overflow-hidden mb-10 bg-white p-8 lg:p-12 shadow-lg">
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <!-- Izquierda: copy -->
          <div class="flex flex-col gap-6">
            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                <Sparkles class="w-3.5 h-3.5" />
                {{ hero.badge }}
              </span>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8E2DFE] to-[#E61655] flex items-center justify-center text-white">
                <Boxes class="w-7 h-7" />
              </div>
              <h3 class="text-2xl lg:text-3xl font-medium text-black tracking-[-0.04em]" style="font-family: Inter;">
                {{ hero.title }}
              </h3>
            </div>

            <p class="text-lg text-gray-700 font-light tracking-tight" style="font-family: Inter;">
              {{ hero.tagline }}
            </p>

            <div class="space-y-1">
              <p class="text-xs font-semibold text-pink-600 uppercase tracking-wide">El problema</p>
              <p class="text-gray-600 font-light leading-relaxed" style="font-family: Inter;">{{ hero.problem }}</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs font-semibold text-pink-600 uppercase tracking-wide">Lo que hacemos</p>
              <p class="text-gray-600 font-light leading-relaxed" style="font-family: Inter;">{{ hero.solution }}</p>
            </div>

            <button
              @click="handleMeetingClick"
              class="group inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full bg-black text-white font-medium cursor-pointer hover:bg-gradient-to-r hover:from-[#8E2DFE] hover:to-[#E61655] transition-all duration-300"
            >
              Agenda un diagnóstico
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <!-- Derecha: entregables -->
          <div class="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <p class="text-sm font-semibold text-black mb-5" style="font-family: Inter;">Qué incluye</p>
            <ul class="space-y-4">
              <li v-for="(item, i) in hero.deliverables" :key="i" class="flex items-start gap-3">
                <span class="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#8E2DFE] to-[#E61655] flex items-center justify-center">
                  <Check class="w-3 h-3 text-white" />
                </span>
                <span class="text-gray-700 font-light tracking-tight" style="font-family: Inter;">{{ item }}</span>
              </li>
            </ul>
          </div>

        </div>
    </div>

    <!-- Servicios secundarios -->
    <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="(service, idx) in services"
        :key="idx"
        class="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-lg"
      >
        <div class="flex items-center gap-4">
          <div :class="`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white`">
            <component :is="service.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-xl lg:text-2xl font-medium text-black tracking-[-0.04em]" style="font-family: Inter;">
            {{ service.title }}
          </h3>
        </div>

        <p class="text-gray-700 font-light tracking-tight" style="font-family: Inter;">
          {{ service.tagline }}
        </p>

        <div class="space-y-1">
          <p class="text-xs font-semibold text-pink-600 uppercase tracking-wide">El problema</p>
          <p class="text-gray-600 font-light leading-relaxed text-sm" style="font-family: Inter;">{{ service.problem }}</p>
        </div>

        <div class="space-y-1">
          <p class="text-xs font-semibold text-pink-600 uppercase tracking-wide">Lo que hacemos</p>
          <p class="text-gray-600 font-light leading-relaxed text-sm" style="font-family: Inter;">{{ service.solution }}</p>
        </div>

        <ul class="flex flex-wrap gap-2 mt-auto pt-2">
          <li
            v-for="(item, i) in service.deliverables"
            :key="i"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 text-xs font-light"
          >
            <Check class="w-3 h-3 text-pink-600" />
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>
