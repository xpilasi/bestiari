<script>
import RegularCard from './RegularCard.vue'
import RegularMobileCard from './RegularMobileCard.vue'

export default {
  name: 'HeroContent',
  components: {
    RegularCard,
    RegularMobileCard
  },
  props: {
    heroTitle: {
      type: String,
      required: true
    },
    heroSubtitle: {
      type: String,
      required: true
    },
    highlightedWord: {
      type: String,
      default: ''
    },
    meetingTitle: {
      type: String,
      required: true
    },
    meetingSubtitle: {
      type: String,
      required: true
    },
    meetingSubtitleColor: {
      type: String,
      default: 'text-gray-300'
    },
    // Props para las imágenes de las cards
    fluidBgImage: {
      type: String,
      default: ''
    },
    horseImage: {
      type: String,
      default: ''
    },
    avatarImage: {
      type: String,
      default: ''
    },
    useCustomGradient: {
      type: Boolean,
      default: false
    },
    gradientColor: {
      type: String,
      default: 'blue-500'
    },
    customGradientClasses: {
      type: String,
      default: 'bg-gradient-to-t from-purple-600 via-purple-400 to-pink-500'
    },
    startButtonText: {
      type: String,
      default: 'Empieza hoy'
    },
    contactButtonText: {
      type: String,
      default: 'Contáctanos'
    }
  },
  emits: ['start-today', 'contact-click', 'meeting-click'],
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
    handleStartTodayClick() {
      this.$emit('start-today');
    },
    handleContactClick() {
      this.$emit('contact-click');
    },
    handleMeetingClick() {
      this.$emit('meeting-click');
    }
  }
}
</script>

<template>
  <div class="mx-auto w-full">
    <div class="flex flex-col xl:flex-row items-center justify-between gap-8 lg:gap-16">
      
      <!-- Hero Header - Lado Izquierdo -->
      <div class="flex flex-col">
        <h1 class="text-4xl lg:text-7xl font-medium tracking-tighter leading-0.5 text-black mb-6 max-w-3xl" 
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
            :meeting-subtitle-color="meetingSubtitleColor"
            :fluid-bg-image="fluidBgImage"
            :horse-image="horseImage"
            :avatar-image="avatarImage"
            :use-custom-gradient="useCustomGradient"
            :gradient-color="gradientColor"
            :custom-gradient-classes="customGradientClasses"
            :start-button-text="startButtonText"
            :contact-button-text="contactButtonText"
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
            :meeting-subtitle-color="meetingSubtitleColor"
            :fluid-bg-image="fluidBgImage"
            :horse-image="horseImage"
            :avatar-image="avatarImage"
            :use-custom-gradient="useCustomGradient"
            :gradient-color="gradientColor"
            :custom-gradient-classes="customGradientClasses"
            :start-button-text="startButtonText"
            :contact-button-text="contactButtonText"
            @start-today="handleStartTodayClick"
            @contact-click="handleContactClick"
            @meeting-click="handleMeetingClick"
          />
        </div>
      </div>
      
    </div>
  </div>
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