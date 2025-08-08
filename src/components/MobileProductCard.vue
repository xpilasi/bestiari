<script>
export default {
  name: 'MobileProductCard',
  props: {
    title: {
      type: String,
      required: true
    },
    bgImage: {
      type: String,
      required: true
    },
    solutionImage: {
      type: String,
      required: true
    },
    imageClasses: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      default: 'Producto'
    },
    // Opcional: personalizar dimensiones de la card
    cardMaxWidth: {
      type: String,
      default: ''
    },
    cardHeight: {
      type: String,
      default: 'h-[350px] md:h-[400px]'
    },
    // Opcional: personalizar posición del texto
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
      default: 'text-xl md:text-2xl'
    },
    subtitleSize: {
      type: String,
      default: 'text-xs md:text-sm'
    },
    // Opcional: overlay gradient
    overlay: {
      type: String,
      default: ''
    }
  },
  computed: {
    // Procesar imageClasses para ajustar alturas responsive
    processedImageClasses() {
      return this.imageClasses
        .replace('h-[250px]', 'h-[290px] md:h-[290px]')
        .replace('h-[180px]', 'h-[200px] md:h-[200px]')
        .replace('h-[280px]', 'h-[290px] md:h-[240px]')
    }
  }
}
</script>

<template>
  <div class="w-full flex-shrink-0 ">
    <div :class="`relative w-full ${cardMaxWidth} mx-auto ${cardHeight} cursor-pointer rounded-2xl overflow-hidden ease-in-out transition-all duration-300 group`">
      
      <!-- Imagen de fondo -->
      <img :src="bgImage" 
           :alt="`${title} background`"
           class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer">
      
      <!-- Imagen del producto/solución -->
      <!-- <img :src="solutionImage" 
           :alt="`${title} solution`"
           :class="`absolute object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 ${processedImageClasses}`"> -->
      
      <!-- Overlay gradient (opcional) -->
      <div 
           :class="`absolute inset-0  ${overlay}`">
      </div>
      
      <!-- Contenido de texto -->
      <div :class="`absolute ${textPosition} ${textWidth} z-10`">
        <!-- Tipo de producto (como badge) -->
        <div class="mb-2 md:mb-3">
          <span class="inline-block px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
            {{ productType }}
          </span>
        </div>
        
        <!-- Título del producto -->
        <h3 :class="`text-white font-medium ${titleSize} leading-tight tracking-[-0.06em] mb-2`"
            style="font-family: Inter;"
            v-html="title.replace(/\n/g, '<br>')">
        </h3>
        
        <!-- Indicador visual (opcional) -->
        <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FFD93B] rounded-full"></div>
          <span :class="`text-gray-300 ${subtitleSize} font-light`" style="font-family: Inter;">
            Ver producto
          </span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 