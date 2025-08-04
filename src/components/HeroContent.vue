<script>
import RegularCard from './RegularCard.vue'
import RegularMobileCard from './RegularMobileCard.vue'
import SectionSubTitle from './SectionSubTitle.vue'

export default {
  name: 'HeroContent',
  components: {
    RegularCard,
    RegularMobileCard,
    SectionSubTitle
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
    subtitleAlignment: {
      type: String,
      default: 'left'
    },
    subtitleColor: {
      type: String,
      default: 'text-gray-600'
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
    },
    mobileCardWidth: {
      type: String,
      default: ''
    },
    animalWidth: {
      type: String,
      default: 'w-80 md:w-[32rem]'
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
  <div class="mx-auto w-full h-full pt-10">
    <!-- Layout Mobile/Tablet -->
    <div class="xl:hidden">
      <div class="flex flex-col items-center gap-8">
        <!-- Hero Header - Móvil -->
        <div class="flex flex-col text-center">
          <h1 class="text-4xl lg:text-7xl font-medium tracking-tighter leading-0.5 text-black mb-6 max-w-3xl" 
              style="font-family: Inter; letter-spacing: -6%; line-height: 1em;"
              v-html="processedTitle">
          </h1>
          <SectionSubTitle 
            :subtitle="heroSubtitle"
            alignment="center"
            :subtitle-color="subtitleColor"
          />
        </div>
        
        <!-- Mobile Card -->
        <div class="w-full ">
          <RegularMobileCard 
            :animal-width="animalWidth"
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
            card-width="w-full h-96"
            @start-today="handleStartTodayClick"
            @contact-click="handleContactClick"
            @meeting-click="handleMeetingClick"
          />
        </div>
      </div>
    </div>

    <!-- Layout Desktop -->
    <div class="hidden xl:flex xl:flex-row items-center justify-between gap-20">
      <!-- Hero Header - Desktop -->
      <div class="flex flex-col">
        <h1 class="text-4xl lg:text-7xl font-medium tracking-tighter leading-0.5 text-black mb-6 max-w-3xl" 
            style="font-family: Inter; letter-spacing: -6%; line-height: 1em;"
            v-html="processedTitle">
        </h1>
        <SectionSubTitle 
          :subtitle="heroSubtitle"
          :alignment="subtitleAlignment"
          :subtitle-color="subtitleColor"
        />
      </div>

      <!-- Desktop Card -->
      <div class="flex justify-center">
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