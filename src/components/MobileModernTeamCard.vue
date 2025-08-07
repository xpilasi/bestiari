<script>
export default {
  name: 'MobileModernTeamCard',
  props: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    gradientFrom: {
      type: String,
      default: 'from-purple-500'
    },
    gradientVia: {
      type: String,
      default: 'via-pink-500'
    },
    gradientTo: {
      type: String,
      default: 'to-orange-400'
    },
    circleSize: {
      type: String,
      default: 'w-64 h-64'
    },
    // Opcional: overlay gradient
    showOverlay: {
      type: Boolean,
      default: true
    },
    textPosition: {
      type: String,
      default: 'bottom-[20px] left-[20px]'
    },
    textWidth: {
      type: String,
      default: 'w-[200px]'
    },
    // Opcional: personalizar estilo del texto
    titleSize: {
      type: String,
      default: 'text-2xl'
    },
    subtitleSize: {
      type: String,
      default: 'text-sm'
    },
    // Opcional: personalizar dimensiones de la card
    cardWidth: {
      type: String,
      default: 'w-full max-w-sm'
    },
    cardHeight: {
      type: String,
      default: 'h-[400px]'
    },
    cardBg: {
      type: String,
      default: ''
    },
    // Props para controlar dimensiones de la foto de perfil en el overlay
    profileImageWidth: {
      type: String,
      default: 'w-40'
    },
    profileImageHeight: {
      type: String,
      default: ''
    },
    profileImageHeightMobile: {
      type: String,
      default: ''
    },
    profileImageWidthMobile: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOverlayOpen: false
    }
  },
  computed: {
    backgroundGradient() {
      return `bg-gradient-to-br ${this.gradientFrom} ${this.gradientVia} ${this.gradientTo}`
    }
  },
  methods: {
    toggleOverlay() {
      this.isOverlayOpen = !this.isOverlayOpen
    },
    closeOverlay() {
      this.isOverlayOpen = false
    }
  }
}
</script>

<template>
  <div 
    :class="`relative ${cardWidth} ${cardHeight} cursor-pointer rounded-2xl overflow-hidden ${cardBg} ease-in-out transition-all duration-300 group`"
    @click="toggleOverlay"
  >
    
    <!-- Imagen de perfil -->
    <img 
      :src="image" 
      :alt="`${name} - ${role}`"
      :class="`absolute inset-0  ${profileImageWidthMobile} ${profileImageHeightMobile} object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer`"
    />
    
    <!-- Overlay gradient (opcional) -->
    <div 
      v-if="showOverlay && !isOverlayOpen" 
      class="absolute inset-0 bg-gradient-to-t from-purple-500/50 via-transparent to-transparent opacity-80 transition-opacity duration-300"
    />
    
    <!-- Botón Maximizar (esquina superior derecha) -->
    <button 
      v-if="!isOverlayOpen"
      @click.stop="toggleOverlay"
      class="absolute top-4 right-4 z-50 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-300 shadow-lg"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
      </svg>
    </button>

    <!-- Contenido de texto inicial -->
    <div 
      v-if="!isOverlayOpen"
      :class="`absolute ${textPosition} ${textWidth} z-10 h-20 transition-opacity duration-300`"
    >
      <!-- Tipo de perfil (como badge) -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
          {{ role }}
        </span>
      </div>
      
      <!-- Nombre del perfil -->
      <h3 
        :class="`text-white font-medium ${titleSize} leading-tight tracking-[-0.06em] mb-2`"
        style="font-family: Inter;"
      >
        {{ name }}
      </h3>
      
      <!-- Indicador visual (opcional) -->
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="w-2 h-2 bg-[#FFD93B] rounded-full"></div>
        <span :class="`text-gray-300 ${subtitleSize} font-light`" style="font-family: Inter;">
          Ver perfil
        </span>
      </div>
    </div>

    <!-- Overlay Information (aparece con fade-in) -->
    <Transition name="overlay-fade">
      <div 
        v-if="isOverlayOpen"
        class="absolute inset-0 bg-gradient-to-br from-coolPurple/50 to-coolPink/50 rounded-2xl backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          @click="closeOverlay"
          class="absolute top-4 right-4 text-white hover:text-white transition-all duration-300 hover:rotate-90 z-30 rounded-2xl"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Profile Content -->
        <div class="flex flex-col items-center space-y-4 text-center">
        
          
          <!-- Name -->
          <h2 class="text-xl font-semibold text-white" style="font-family: Inter;">
            {{ name }}
          </h2>
          
          <!-- Role -->
          <p class="text-md text-white font-light italic font-instrument-serif">
            {{ role }}
          </p>
          
          <!-- Description -->
          <p class="text-white text-center leading-relaxed text-sm px-2" style="font-family: Inter;">
            {{ description }}
          </p>
          
          <!-- LinkedIn Icon -->
          <a 
            :href="linkedin" 
            target="_blank" 
            class="inline-flex items-center justify-center w-12 h-12 bg-transparent hover:scale-105 rounded-full transition-all duration-200 cursor-pointer mt-4"
          >
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Transiciones para el overlay */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.overlay-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.overlay-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.overlay-fade-enter-to,
.overlay-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style> 