<script>
import RegularCard from '../components/RegularCard.vue'
import RegularMobileCard from '../components/RegularMobileCard.vue'

export default {
  name: 'HomeHeroSection',
  components: {
    RegularCard,
    RegularMobileCard
  },
  data() {
    return {
      heroTitle: 'Tu web profesional empieza aquí',
      heroSubtitle: 'Haz crecer tu presencia digital y atrae más clientes.',
      highlightedWord: 'aquí', // Palabra que se va a destacar
      meetingTitle: 'Reserva una Meeting de 15 minutos',
      meetingSubtitle: 'Agenda ahora'
    }
  },
  computed: {
    processedTitle() {
      if (!this.highlightedWord) return this.heroTitle;
      
      // Regex que maneja tildes y acentos correctamente
      const regex = new RegExp(`(^|\\s)(${this.highlightedWord})(\\s|$|[.,!?;:])`, 'gi');
      return this.heroTitle.replace(regex, (match, before, word, after) => {
        return `${before}<span class="italic font-light text-5xl lg:text-[80px] highlighted-word" style="font-family: 'Instrument Serif', serif;">${word}</span>${after}`;
      });
    }
  },
  methods: {
    handleContactClick() {
      // Navegación a contacto
      console.log('Navegando a contacto...')
    },
    handleStartTodayClick() {
      // Acción para empezar hoy
      console.log('Empezando hoy...')
    },
    handleMeetingClick() {
      // Abrir calendario o enlace de reunión
      console.log('Agendando reunión...')
    }
  }
}
</script>

<template>
  <section class="min-h-screen-[100vh] bg-primary flex flex-col justify-center xl:justify-start py-10 xl:py-30  ">
    <div class="mx-auto w-full ">
      <div class="flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-16">
        
        <!-- Hero Header - Lado Izquierdo -->
        <div class="flex flex-col  ">
          <h1 class="text-4xl lg:text-7xl font-medium tracking-tighter leading-0.5 text-black  mb-6 max-w-3xl" 
              style="font-family: Inter; letter-spacing: -6%; line-height: 1em;"
              v-html="processedTitle">
          </h1>
          <p class="text-base lg:text-xl text-gray-600 font-extralight !leading-[25px] tracking-tight"
             style="font-family: Inter; letter-spacing: -6%; line-height: 3.2em;">
            {{ heroSubtitle }}
          </p>
        </div>

        <!-- Regular Cards - Lado Derecho -->
        <div class="flex justify-center">
          <!-- Mobile Card - Visible solo en móvil -->
          <div class="block xl:hidden">
            <RegularMobileCard 
              :meeting-title="meetingTitle"
              :meeting-subtitle="meetingSubtitle"
              @start-today="handleStartTodayClick"
              @contact-click="handleContactClick"
              @meeting-click="handleMeetingClick"
            />
          </div>
          
          <!-- Desktop Card - Visible solo en desktop -->
          <div class="hidden xl:block">
            <RegularCard 
              :meeting-title="meetingTitle"
              :meeting-subtitle="meetingSubtitle"
              
              @start-today="handleStartTodayClick"
              @contact-click="handleContactClick"
              @meeting-click="handleMeetingClick"
            />
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilo para la palabra destacada - Solo gradiente */
.highlighted-word {
  background: linear-gradient(135deg, #8E2DFE 0%, #E61655 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}
</style>