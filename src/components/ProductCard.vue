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
    productType: {
      type: String,
      default: 'Producto'
    },
    // Opcional: personalizar dimensiones de la card
    cardWidth: {
      type: String,
      default: 'w-full '
    },
    cardHeight: {
      type: String,
      default: 'h-[400px]'
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
      default: 'text-2xl'
    },
    subtitleSize: {
      type: String,
      default: 'text-sm'
    },
    // Opcional: overlay gradient
    overlay: {
      type: String,
      default:""
    }
  }
}
</script>

<template>
  <div :class="`relative ${cardWidth} ${cardHeight} cursor-pointer rounded-2xl overflow-hidden ease-in-out transition-all duration-300 group`">
    
    <!-- Imagen de fondo -->
    <img :src="bgImage" 
         :alt="`${title} background`"
         class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer">
    
    <!-- Imagen del producto/solución -->
    <!-- <img :src="solutionImage" 
         :alt="`${title} solution`"
         :class="`absolute object-cover rotate-[15deg] transition-transform duration-300 ease-in-out group-hover:scale-110 ${imageClasses}`">
     -->
    <!-- Overlay gradient (opcional) -->
    <div  
         :class="`absolute inset-0 ${overlay}`">
    </div>
    
    <!-- Contenido de texto -->
    <div :class="`absolute ${textPosition} ${textWidth} z-10`">
      <!-- Tipo de producto (como badge) -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
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
        <div class="w-2 h-2 bg-[#FFD93B] rounded-full"></div>
        <span :class="`text-gray-300 ${subtitleSize} font-light`" style="font-family: Inter;">
          Ver producto
        </span>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 