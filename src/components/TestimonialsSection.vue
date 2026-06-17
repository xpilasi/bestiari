<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'TestimonialsSection',
  components: {
    SectionTitle
  },
  props: {
    // Padding horizontal: usar el por defecto cuando la sección vive en un contenedor
    // sin padding (Home); pasar '' cuando el contenedor padre ya aporta el padding (Proyectos).
    paddingX: {
      type: String,
      default: 'px-4 lg:px-48 2xl:px-80'
    }
  },
  data() {
    return {
      sectionTitle: 'Hecho para negocios como el tuyo',
      highlightedWord: 'tuyo',
      // Perfil de cliente ideal — honesto, sin testimonios inventados.
      // Cuando haya clientes reales, este bloque puede dar paso a testimonios.
      fits: [
        {
          id: 1,
          eyebrow: 'Ya estás en marcha',
          text: 'Tienes clientes, equipo y facturación. Lo que te sobra es trabajo manual y hojas de cálculo que se quedan cortas.',
          gradient: 'from-[#8E2DFE] to-[#E61655]'
        },
        {
          id: 2,
          eyebrow: 'Te gusta lo bien hecho',
          text: 'Crees que una herramienta también se disfruta. Hacemos software que tu equipo usa con gusto, no por obligación.',
          gradient: 'from-orange-500 to-rose-500'
        },
        {
          id: 3,
          eyebrow: 'Quieres crecer sin caos',
          text: 'Automatizamos lo repetitivo y ordenamos tu información, para que tu tiempo vaya a lo que de verdad importa.',
          gradient: 'from-blue-500 to-purple-600'
        }
      ]
    }
  }
}
</script>

<template>
  <section id="testimonials" :class="`min-h-screen flex flex-col justify-center py-16 lg:py-24 ${paddingX}`">

    <!-- Título -->
    <div class="text-center mb-16">
      <SectionTitle
        :title="sectionTitle"
        :highlighted-word="highlightedWord"
        alignment="center"
      />
    </div>

    <!-- Cards -->
    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      <div
        v-for="fit in fits"
        :key="fit.id"
        class="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-lg"
      >
        <!-- Acento -->
        <span :class="`w-10 h-1.5 rounded-full bg-gradient-to-r ${fit.gradient}`"></span>

        <!-- Eyebrow / heading -->
        <h3 class="text-xl font-medium text-black tracking-[-0.04em]" style="font-family: Inter;">
          {{ fit.eyebrow }}
        </h3>

        <!-- Texto -->
        <p class="text-gray-600 font-light leading-relaxed" style="font-family: Inter;">
          {{ fit.text }}
        </p>
      </div>
    </div>

  </section>
</template>
