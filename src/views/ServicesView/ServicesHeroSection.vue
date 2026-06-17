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
      heroTitle: 'Soluciones hechas a tu medida',
      heroSubtitle: 'Desde SaaS y web apps de gestión hasta sitios comerciales y apps móviles. Software pensado para cómo trabaja tu negocio.',
      highlightedWord: 'medida', // Palabra que se va a destacar
      meetingTitle: 'Agenda un diagnóstico de 30 min',
      meetingSubtitle: 'Sin compromiso',
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
      window.dispatchEvent(new CustomEvent('open-contact-modal'))
    },
    handleStartTodayClick() {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/bestiariagencia/30min' })
      }
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
  <section id="services-hero" class="min-h-[93vh] lg:min-h-[91vh] bg-primary flex flex-col justify-start xl:justify-start py-0 xl:py-10  ">
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
