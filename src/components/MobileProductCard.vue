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
    // Opcional: personalizar dimensiones de la card
    cardMaxWidth: {
      type: String,
      default: 'max-w-sm'
    },
    cardHeight: {
      type: String,
      default: 'h-[350px] md:h-[400px]'
    },
    // Opcional: personalizar posición del texto
    textPosition: {
      type: String,
      default: 'bottom-[16px] left-[20px] md:left-[30px]'
    },
    textWidth: {
      type: String,
      default: 'w-[200px]'
    },
    textHeight: {
      type: String,
      default: 'h-[84px]'
    },
    // Opcional: personalizar estilo del texto
    textSize: {
      type: String,
      default: 'text-3xl md:text-2xl'
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
  <div class="w-full flex-shrink-0 px-4">
    <div :class="`relative w-full ${cardMaxWidth} mx-auto ${cardHeight} bg-gray-300 rounded-2xl overflow-hidden`">
      <!-- Imagen de fondo fluida -->
      <img :src="bgImage" 
           :alt="`Fluid background ${title.toLowerCase()}`"
           class="absolute inset-0 w-full h-full object-cover">
      
      <!-- Imagen del producto/solución -->
      <img :src="solutionImage" 
           :alt="`${title} solution`"
           :class="`absolute object-cover rotate-[15deg] ${processedImageClasses}`">
      
      <!-- Texto -->
      <div :class="`absolute ${textPosition} ${textWidth} ${textHeight}`">
        <p :class="`text-white font-medium ${textSize} leading-[0.84em] tracking-[-0.06em]`"
           style="font-family: Inter;"
           v-html="title.replace(/\n/g, '<br>')">
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 