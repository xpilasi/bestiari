<script>
import HeroContent from '@/components/HeroContent.vue'
import fluidBgImage from '@/assets/img/bg/fluid-bg-purple.png'
import animalImage from '@/assets/img/animals/panda-avatar.png'
import avatarImage from '@/assets/img/animals/panda-avatar.png'

export default {
  name: 'ServicesHeroSection',
  components: {
    HeroContent
  },
  data() {
    return {
      heroTitle: 'Soluciones que inspiran',
      heroSubtitle: 'Todo lo que necesitas para destacar online.',
      highlightedWord: 'inspiran', // Palabra que se va a destacar
      meetingTitle: 'Reserva una Meeting de 15 minutos',
      meetingSubtitle: 'Agenda ahora',
      fluidBgImage: fluidBgImage,
      animalImage: animalImage,
      avatarImage: avatarImage,
      useCustomGradient: true,
      gradientColor: 'blue-500',
      customGradientClasses: 'bg-gradient-to-b from-transparent to-purple-500',
      bgTopPosition: '-top-[10rem] md:-top-[16rem]',
      bgHeight: 'h-[400px] md:h-[800px]',
      startButtonText: 'Empezar hoy',
      contactButtonText: 'Contactar',
      mobileCardWidth: 'w-[20rem] md:w-[40rem]',
      
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
  <section class="min-h-screen-[100vh] bg-primary flex flex-col justify-center xl:justify-start py-0 xl:py-30  ">
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
