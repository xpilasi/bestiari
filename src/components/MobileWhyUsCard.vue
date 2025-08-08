<script>
import whyUsImage1 from '@/assets/img/design/just-list.webp'
import whyUsImage2 from '@/assets/img/why-us/why-us-image-2.png'
import whyUsImage3 from '@/assets/img/why-us/why-us-image-3.png'
import whyUsImage4 from '@/assets/img/why-us/why-us-image-4.png'
import fluidBgAbstract from '@/assets/img/why-us/fluid-bg-abstract.png'

export default {
  name: 'MobileWhyUsCard',
  props: {
    number: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    // Opcional: personalizar dimensiones de la card
    cardMaxWidth: {
      type: String,
      default: ''
    },
    cardHeight: {
      type: String,
      default: ''
    },
    // Opcional: personalizar posición del texto
    textPosition: {
      type: String,
      default: 'bottom-[20px] left-[20px]'
    },
    textWidth: {
      type: String,
      default: 'w-[280px]'
    },
    // Opcional: personalizar estilo del texto
    numberSize: {
      type: String,
      default: 'text-2xl'
    },
    titleSize: {
      type: String,
      default: 'text-xl md:text-2xl'
    },
    subtitleSize: {
      type: String,
      default: ''
    },
    // Opcional: overlay gradient
    showOverlay: {
      type: Boolean,
      default: true
    },
    bgImage: {
      type: String,
      default: ''
    },
    bgGradientCard: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      backgroundImages: [
      whyUsImage1,
        fluidBgAbstract,
        fluidBgAbstract,
        fluidBgAbstract
      ],
      whyUsImages: [
        whyUsImage1,
        whyUsImage2,
        whyUsImage3,
        whyUsImage4
      ]
    }
  },
  computed: {
    currentBgImage() {
      const index = parseInt(this.number) - 1
      return this.backgroundImages[index] || this.backgroundImages[0]
    },
    currentWhyUsImage() {
      const index = parseInt(this.number) - 1
      return this.whyUsImages[index] || this.whyUsImages[0]
    },
    gradientColors() {
      const gradients = {
        '01': 'from-purple-600 to-pink-500',
        '02': 'from-blue-600 to-purple-500',
        '03': 'from-green-500 to-blue-500',
        '04': 'from-pink-500 to-red-500'
      }
      return gradients[this.number] || 'from-purple-600 to-pink-500'
    }
  }
}
</script>

<template>
  <div class="w-full flex-shrink-0 px-4">
    <div :class="`relative w-full ${cardMaxWidth || 'max-w-none'} mx-auto ${cardHeight || 'h-96'} cursor-pointer rounded-2xl overflow-hidden ease-in-out transition-all duration-300 group `">
      
      <!-- Imagen de fondo -->
      <img :src="bgImage" 
           :alt="`${title} background`"
           class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer">
      
      <!-- Imagen decorativa why us -->
      <!-- <img :src="currentWhyUsImage" 
           :alt="`${title} illustration`"
           class="absolute top-[30px] -right-[20px] h-[200px] object-cover opacity-60 transition-transform duration-300 ease-in-out group-hover:scale-110"> -->
      
      <!-- Overlay gradient -->
      <div v-if="showOverlay" 
           :class="`absolute inset-0 ${bgGradientCard}   transition-opacity duration-300`">
      </div>
      
      <!-- Contenido de texto -->
      <div :class="`absolute ${textPosition} ${textWidth} z-10`">
        <!-- Número como badge -->
        <!-- <div class="mb-3 md:mb-4">
          <span :class="`inline-block px-3 py-2 bg-gradient-to-r ${gradientColors} text-white ${numberSize} font-bold rounded-full tracking-wide shadow-lg`"
                style="font-family: 'Instrument Serif', serif; font-style: italic;">
            {{ number }}
          </span>
        </div> -->
        
        <!-- Título -->
        <h3 :class="`text-white font-inter font-semibold ca${titleSize} mb-3 inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-md font-semibold rounded-full uppercase tracking-wide`"
            >
          {{ title }}
        </h3>
        
        <!-- Subtítulo/Descripción -->
        <p :class="`text-gray-200 font-light ${subtitleSize} leading-relaxed tracking-[-0.02em] mb-4 text-md`"
           >
          {{ subtitle }}
        </p>
        
        <!-- Indicador visual en hover -->
        <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="w-2 h-2 bg-[#FFD93B] rounded-full"></div>
          <span class="text-gray-300 text-sm font-light" style="font-family: Inter;">
            Saber más
          </span>
        </div>
      </div>
      
    </div>
  </div>
</template>

