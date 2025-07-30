<script>
export default {
  name: 'SectionsNavigator',
  props: {
    sections: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.every(section => 
          section.hasOwnProperty('id') && 
          section.hasOwnProperty('label') && 
          section.hasOwnProperty('icon')
        )
      }
    },
    currentSection: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    lastSectionId: {
      type: String,
      required: true
    },
    Dots:{
        type: Boolean,
        default: false
    }

  },
  emits: ['navigate-to-next', 'navigate-to-section'],
  methods: {
    navigateToNextSection() {
      this.$emit('navigate-to-next')
    },
    
    scrollToSection(sectionId) {
      this.$emit('navigate-to-section', sectionId)
    }
  }
}
</script>

<template>
  <!-- Navigation Button - Fixed Bottom Center -->
  <div v-show="isVisible" class="fixed bottom-10 left-1/2 right-1/2  transform  z-50">
    <div class="relative">
      <!-- Main Navigation Button -->
      <button 
        @click="navigateToNextSection()"
        class="group relative bg-transparent cursor-pointer from-purple-600 to-pink-500 text-black px-8 py-3 rounded-full shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 animate-bounce-subtle"
      >
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4 transform transition-transform duration-300" 
               :class="currentSection === lastSectionId ? 'rotate-180' : ''"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
        
        <!-- Pulse Ring Effect - Only on Hover -->
        <div class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
      </button>
      
      <!-- Section Dots -->
      <div v-if="Dots" class="absolute -top-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button 
          v-for="section in sections" 
          :key="section.id"
          @click="scrollToSection(section.id)"
          class="h-2 rounded-full transition-all duration-200 hover:scale-125 group"
          :class="currentSection === section.id 
            ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-6 shadow-lg shadow-purple-500/30' 
            : 'bg-white/30 hover:bg-white/60 w-2 hover:w-4 cursor-pointer'"
          :title="section.label"
        >
          <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            {{ section.icon }} {{ section.label }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de rebote sutil */
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-8px) translateX(-50%);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

/* Efecto de pulso para el anillo */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Hover effect para el botón principal */
.group:hover .animate-bounce-subtle {
  animation-play-state: paused;
}

/* Tooltip positioning */
.group:hover span {
  z-index: 60;
}
</style> 