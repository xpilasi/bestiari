<script>
// Importar imágenes por defecto
import fluidBgDefault from '@/assets/img/bg/fluid-bg.png'
import horseDefault from '@/assets/img/animals/horse-cool.png'
import avatarDefault from '@/assets/img/animals/panda-avatar.png'
// Importar icono de flechaºº
import { ArrowRight } from 'lucide-vue-next'

export default {
  name: 'RegularMobileCard',
  components: {
    ArrowRight
  },
  props: {
    // Props para las imágenes
    fluidBgImage: {
      type: String,
      default: fluidBgDefault
    },
    horseImage: {
      type: String,
      default: horseDefault
    },
    avatarImage: {
      type: String,
      default: avatarDefault
    },
    
    // Props para el gradiente personalizado
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
    
    // Props para posicionamiento del fondo (adaptado para móvil y tablet)
    bgTopPosition: {
      type: String,
      default: '-top-[6rem] md:-top-[12rem]'
    },
    bgHeight: {
      type: String,
      default: 'h-[500px] md:h-[900px]'
    },
    
    // Props para contenido
    startButtonText: {
      type: String,
      default: 'Empieza hoy'
    },
    contactButtonText: {
      type: String,
      default: 'Contáctanos'
    },
    meetingTitle: {
      type: String,
      default: 'Reserva una Meeting de 15 minutos'
    },
    meetingSubtitle: {
      type: String,
      default: 'Agenda ahora'
    },
    meetingSubtitleColor: {
      type: String,
      default: 'text-gray-300'
    },
    
    // Props para dimensiones de la card (optimizado para móvil y tablet)
    cardWidth: {
      type: String,
      default: 'w-full h-[500px] md:h-[48rem]'
    },
    animalWidth: {
      type: String,
      default: 'w-70 md:w-[32rem]'
    }
  },
  emits: ['start-today', 'contact-click', 'meeting-click'],
  methods: {
    handleStartToday() {
      this.$emit('start-today');
    },
    handleContactClick() {
      this.$emit('contact-click');
    },
    handleMeetingClick() {
      this.$emit('meeting-click');
    }
  },
  computed: {
    gradientClasses() {
      if (this.useCustomGradient) {
        return this.customGradientClasses;
      }
      return 'gradient-overlay';
    },
    gradientStyle() {
      if (this.useCustomGradient) {
        return {};
      }
      
      const colorMap = {
        'blue-500': '59, 130, 246',
        'red-500': '239, 68, 68',
        'green-500': '34, 197, 94',
        'purple-500': '168, 85, 247',
        'yellow-500': '234, 179, 8',
        'pink-500': '236, 72, 153'
      };
      
      const colorRgb = colorMap[this.gradientColor] || '59, 130, 246';
      
      return {
        background: `linear-gradient(180deg, rgba(${colorRgb}, 0) 0%, rgba(${colorRgb}, 0.6) 50%, rgba(${colorRgb}, 1) 100%)`
      };
    },
    fluidBgClasses() {
      return `absolute inset-0 w-full h-full object-cover z-0`;
    }
  }
}
</script>

<template>
  <div class="relative">
    <div :class="`${cardWidth}  rounded-2xl shadow-2xl overflow-hidden relative h-1/3 `"
         >
      
      <!-- Imagen de fondo fluida -->
      <img :src="fluidBgImage" 
           alt="Fluid background"
           :class="fluidBgClasses">
      
      <!-- Imagen del caballo -->
      <img :src="horseImage" 
           alt="Horse cool character"
           :class="`absolute top-0 right-2 bottom-0 ${animalWidth} object-cover z-10`">
      
      <!-- Gradiente inferior -->
      <div class="absolute bottom-0 left-0 right-0 h-40 md:h-80 z-20"
           :class="gradientClasses"
           :style="gradientStyle"></div>
      
      <!-- Botón Empieza hoy -->
      <button @click="handleStartToday"
              class="absolute top-4 md:top-8 left-4 md:left-8 bg-black rounded-full px-3 md:px-6 py-1.5 md:py-3 flex items-center gap-1.5 md:gap-3 text-white text-xs md:text-base font-normal z-30">
        <div class="w-1.5 h-1.5 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
        <span class="py-0.5 md:py-1 text-xs md:text-base">{{ startButtonText }}</span>
      </button>
      
      <!-- Botón Contáctanos -->
      <button @click="handleContactClick"
              class="absolute bottom-20 md:bottom-40 left-4 md:left-8 right-4 md:right-8 bg-white rounded-lg py-3 md:py-6 text-gray-700 font-semibold tracking-tighter text-lg md:text-3xl shadow-xl z-30">
        {{ contactButtonText }}
      </button>
      
      <!-- Meeting Action Widget -->
      <div class="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex items-center justify-between gap-2 md:gap-4 z-30">
        <!-- Animal Avatar -->
        <div class="relative flex-shrink-0">
          <div class="w-8 h-8 md:w-16 md:h-16 bg-white rounded-full overflow-hidden relative">
            <div class="absolute -top-1 md:-top-2 left-0 w-8 md:w-16 h-10 md:h-20"></div>
            <img :src="avatarImage" 
                 alt="Avatar"
                 class="absolute h-16 md:h-32 object-cover">
          </div>
        </div>
        
        <!-- Meeting Text -->
        <div class="flex flex-col justify-start items-start gap-0.5 md:gap-1 flex-1 min-w-0">
          <span class="text-white font-semibold text-xs md:text-lg leading-tight truncate w-full">{{ meetingTitle }}</span>
          <p :class="`${meetingSubtitleColor} font-light text-xs md:text-base truncate w-full`">{{ meetingSubtitle }}</p>
        </div>
        
        <!-- Arrow Button -->
        <button @click="handleMeetingClick"
                class="w-8 h-8 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowRight class="w-4 h-4 md:w-8 md:h-8 text-gray-700" />
        </button>
      </div>
    </div>
  </div>
</template>
