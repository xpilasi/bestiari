<script>
import HeroContent from '@/components/HeroContent.vue'
import fluidBgImage from '@/assets/img/bg/fluid-bg-2.png'
import animalImage from '@/assets/img/animals/fox-cool.png'
import avatarImage from '@/assets/img/animals/panda-avatar.png'

export default {
  name: 'AboutHeroSection',
  components: {
    HeroContent
  },
  data() {
    return {
      heroTitle: 'Somos tu equipo de desarrollo',
      heroSubtitle: 'Conoce al equipo que lleva tu marca al siguiente nivel.',
      highlightedWord: 'tu', // Palabra que se va a destacar
      meetingTitle: 'Reserva una Meeting de 15 minutos',
      meetingSubtitle: 'Agenda ahora',
      fluidBgImage: fluidBgImage,
      animalImage: animalImage,
      avatarImage: avatarImage,
      useCustomGradient: true,
      gradientColor: 'blue-500',
      customGradientClasses: 'bg-gradient-to-b from-transparent to-yellow-500',
      bgTopPosition: '-top-[10rem] md:-top-[16rem]',
      bgHeight: 'h-[400px] md:h-[800px]',
      startButtonText: 'Empezar hoy',
      contactButtonText: 'Contactar',
      mobileCardWidth: 'w-[20rem] md:w-[40rem]',
      meetingSubtitleColor: 'text-black'
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
  <section id="about-hero" class="min-h-screen-[100vh] bg-primary flex flex-col justify-center xl:justify-start py-10 xl:py-30">
    <HeroContent 
      :hero-title="heroTitle"
      :hero-subtitle="heroSubtitle"
      :highlighted-word="highlightedWord"
      :meeting-title="meetingTitle"
      :meeting-subtitle="meetingSubtitle"
      :meeting-subtitle-color="meetingSubtitleColor"
      :fluid-bg-image="fluidBgImage"
      :horse-image="animalImage"
      :avatar-image="avatarImage"
      :use-custom-gradient="useCustomGradient"
      :gradient-color="gradientColor"
      :custom-gradient-classes="customGradientClasses"
      :bg-top-position="bgTopPosition"
      :bg-height="bgHeight"
      :start-button-text="startButtonText"
      :contact-button-text="contactButtonText"
      :card-width="mobileCardWidth"
      @start-today="handleStartTodayClick"
      @contact-click="handleContactClick"
      @meeting-click="handleMeetingClick"
    />
  </section>
</template>
