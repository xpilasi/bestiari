<script>
export default {
  name: 'ProductCard',
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
    cardWidth: {
      type: String,
      default: 'w-[300px]'
    },
    cardHeight: {
      type: String,
      default: 'h-[400px]'
    },
    // Opcional: personalizar posición del texto
    textPosition: {
      type: String,
      default: 'bottom-[16px] left-[30px]'
    },
    textWidth: {
      type: String,
      default: 'w-[160px]'
    },
    textHeight: {
      type: String,
      default: 'h-[84px]'
    },
    // Opcional: personalizar estilo del texto
    textSize: {
      type: String,
      default: 'text-[25px]'
    }
  }
}
</script>

<template>
  <div :class="`relative ${cardWidth} ${cardHeight} bg-gray-300 rounded-2xl overflow-hidden`">
    <!-- Imagen de fondo fluida -->
    <img :src="bgImage" 
         :alt="`Fluid background ${title.toLowerCase()}`"
         class="absolute h-[500px] object-cover">
    
    <!-- Imagen del producto/solución -->
    <img :src="solutionImage" 
         :alt="`${title} solution`"
         :class="`absolute object-cover rotate-[15deg] ${imageClasses}`">
    
    <!-- Texto -->
    <div :class="`absolute ${textPosition} ${textWidth} ${textHeight}`">
      <p :class="`text-white font-medium ${textSize} leading-[0.84em] tracking-[-0.06em]`"
         style="font-family: Inter;"
         v-html="title.replace(/\n/g, '<br>')">
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 