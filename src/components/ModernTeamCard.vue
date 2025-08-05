<script>
import modernTeamImage from '@/assets/img/team/modern-team-member.png'

export default {
  name: 'ModernTeamCard',
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
      default: 'bg-gradient-to-br from-coolPurple to-coolPink'
    },
    // Props para controlar dimensiones de la foto de perfil en el modal
    profileImageWidth: {
      type: String,
      default: 'w-40'
    },
    profileImageHeight: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isModalOpen: false,
      modernTeamImage
    }
  },
  computed: {
    backgroundGradient() {
      return `bg-gradient-to-br ${this.gradientFrom} ${this.gradientVia} ${this.gradientTo}`
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    }
  }
}
</script>

<template>
  
    
  <div 
  :class="`relative ${cardWidth} ${cardHeight} cursor-pointer rounded-2xl overflow-hidden ${cardBg} ease-in-out transition-all duration-300  group`"
  @click="openModal">
    
    <!-- Imagen de perfil -->
    <img :src="image" 
         :alt="`${name} - ${role}`"
         :class="` absolute inset-0 ${profileImageWidth} ${profileImageHeight} object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer`"
         >
    
    <!-- Overlay gradient (opcional) -->
    <div v-if="showOverlay" 
         class="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent opacity-80  transition-opacity duration-300">
    </div>
    
    <!-- Contenido de texto -->
    <div :class="`absolute ${textPosition} ${textWidth} z-10  h-20`">
      <!-- Tipo de perfil (como badge) -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
          {{ role }}
        </span>
      </div>
      
      <!-- Nombre del perfil -->
      <h3 :class="`text-white font-medium ${titleSize} leading-tight tracking-[-0.06em] mb-2`"
          style="font-family: Inter;">
        {{ name }}
      </h3>
      
     
    </div>
     <!-- Indicador visual (opcional) -->
      <div class="absolute top-3 right-3 ">
        <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm rounded-2xl px-3 w-fit py-1">
        <div class="w-2 h-2 bg-[#FFD93B] rounded-full"></div>
        <span :class="`text-gray-300 ${subtitleSize} font-light`" style="font-family: Inter;">
          Ver perfil
        </span>
      </div>
    
      </div>
     
  </div>
     
    

    <!-- Modal (same as original) -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click="closeModal">
      <div class="bg-white backdrop-blur-sm rounded-2xl p-8 max-w-md w-full mx-4 relative" @click.stop>
        <!-- Close Button -->
        <button @click="closeModal" class="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Modal Content -->
        <div class="flex flex-col items-center space-y-4">
          <!-- Profile Image -->
          <div :class="`w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-coolPurple/30 to-coolPink/30`">
            <img :src="image" :alt="name" class="w-full h-full object-cover">
          </div>
          
          <!-- Name -->
          <h2 class="text-2xl font-semibold text-black" style="font-family: Inter;">{{ name }}</h2>
          
          <!-- Role -->
          <p class="text-lg text-pink-600 font-light italic font-instrument-serif"  >{{ role }}</p>
          
          <!-- Description -->
          <p class="text-black text-center leading-relaxed" style="font-family: Inter;">{{ description }}</p>
          
          <!-- LinkedIn Icon -->
          <a :href="linkedin" target="_blank" class="inline-flex items-center justify-center w-20 h-10 bg-transparent hover:scale-105 rounded-full transition-all duration-200 cursor-pointer">
            <svg class="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
 
</template>
