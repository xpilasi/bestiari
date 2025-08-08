<script>
import HeroContent from '@/components/HeroContent.vue'
import fluidBgImage from '@/assets/img/bg/fluid-bg.png'
import horseImage from '@/assets/img/animals/horse-cool.png'
import avatarImage from '@/assets/img/animals/panda-avatar.png'

export default {
  name: 'HomeHeroSection',
  components: {
    HeroContent
  },
  data() {
    return {
      heroTitle: 'Tu web profesional empieza aquí',
      heroSubtitle: 'Haz crecer tu presencia digital y atrae más clientes.',
      highlightedWord: 'aquí', // Palabra que se va a destacar
      meetingTitle: 'Reserva una Meeting de 15 minutos',
      meetingSubtitle: 'Agenda ahora',
      fluidBgImage: fluidBgImage,
      horseImage: horseImage,
      avatarImage: avatarImage,
      useCustomGradient: true,
      gradientColor: 'blue-500',
      customGradientClasses: 'bg-gradient-to-b from-transparent to-blue-500',
      bgTopPosition: '-top-[8rem] md:-top-[16rem]',
      bgHeight: 'h-[400px] md:h-[800px]',
      startButtonText: 'Empezar hoy',
      contactButtonText: 'Contactar',
      mobileCardWidth: 'w-full h-96 md:h-[48rem]',
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
  <section id="hero" class="min-h-[93vh] lg:min-h-[91vh]  flex flex-col justify-start xl:justify-start py-0 xl:py-10 px-4 xl:px-48 2xl:px-80 ">
    <HeroContent 
      animal-width="w-[400px]"
      :hero-title="heroTitle"
      :hero-subtitle="heroSubtitle"
      :highlighted-word="highlightedWord"
      :meeting-title="meetingTitle"
      :meeting-subtitle="meetingSubtitle"
      :fluid-bg-image="fluidBgImage"
      :horse-image="horseImage"
      :avatar-image="avatarImage"
      :use-custom-gradient="useCustomGradient"
      :gradient-color="gradientColor"
      :custom-gradient-classes="customGradientClasses"
      :bg-top-position="bgTopPosition"
      :bg-height="bgHeight"
      :start-button-text="startButtonText"
      :contact-button-text="contactButtonText"
      :mobile-card-width="mobileCardWidth"
      @start-today="handleStartTodayClick"
      @contact-click="handleContactClick"
      @meeting-click="handleMeetingClick"
    />
  </section>
</template>
