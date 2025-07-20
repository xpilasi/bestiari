<script>
// Importar imágenes por defecto
import fluidBgDefault from '@/assets/img/bg/fluid-bg.png'
import horseDefault from '@/assets/img/animals/horse-cool.png'
import avatarDefault from '@/assets/img/animals/panda-avatar.png'
// Importar icono de flecha
import { ArrowRight } from 'lucide-vue-next'

export default {
  name: 'RegularCard',
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
    
    // Props para posicionamiento del fondo
    bgTopPosition: {
      type: String,
      default: '-top-[14rem]'
    },
    bgHeight: {
      type: String,
      default: 'h-[900px]'
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
    
    // Props para dimensiones de la card
    cardWidth: {
      type: String,
      default: 'w-64 h-80 xl:w-96 xl:h-120'
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
      return `absolute ${this.bgTopPosition} w-[30rem] ${this.bgHeight} object-cover z-0`;
    }
  }
}
</script>

<template>
  <div class="relative">
    <div :class="`${cardWidth} bg-gray-300 rounded-2xl shadow-2xl overflow-hidden relative`"
         style="box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.74);">
      
      <!-- Imagen de fondo fluida -->
      <img :src="fluidBgImage" 
           alt="Fluid background"
           :class="fluidBgClasses">
      
      <!-- Imagen del caballo -->
      <img :src="horseImage" 
           alt="Horse cool character"
           class="absolute top-0 left-[5.5rem] bottom-0 w-80 object-cover z-10">
      
      <!-- Gradiente inferior -->
      <div class="absolute bottom-0 left-0 right-0 h-56 z-20"
           :class="gradientClasses"
           :style="gradientStyle"></div>
      
      <!-- Botón Empieza hoy -->
      <button @click="handleStartToday"
              class="absolute top-5 left-6 bg-black rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs font-normal z-30">
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <span class="py-1">{{ startButtonText }}</span>
      </button>
      
      <!-- Botón Contáctanos -->
      <button @click="handleContactClick"
              class="absolute hover:scale-105 cursor-pointer transition-all duration-300 bottom-28 left-9 right-9 bg-white rounded-lg py-4 text-gray-700 font-semibold tracking-tighter text-2xl shadow-xl z-30">
        {{ contactButtonText }}
      </button>
      
      <!-- Meeting Action Widget -->
      <div class="absolute justify-between flex-row bottom-8 left-9 right-9 flex items-center gap-3 z-30">
        <!-- Animal Avatar -->
        <div class="relative">
          <div class="w-10 h-10 bg-white rounded-full overflow-hidden relative">
            <div class="absolute -top-1 left-0 w-9 h-11"></div>
            <img :src="avatarImage" 
                 alt="Avatar"
                 class="absolute h-24 object-cover">
          </div>
        </div>
        
        <!-- Meeting Text -->
        <div class="flex flex-col justify-start items-start gap-1">
          <span class="text-white font-semibold text-xs leading-tight">{{ meetingTitle }}</span>
          <p :class="`${meetingSubtitleColor} font-light text-xs`">{{ meetingSubtitle }}</p>
        </div>
        
        <!-- Arrow Button -->
        <button @click="handleMeetingClick"
                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 cursor-pointer transition-all duration-300">
          <ArrowRight class="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Clase base para gradientes */
.gradient-overlay {
  /* El estilo se aplica dinámicamente via :style */
}
</style>