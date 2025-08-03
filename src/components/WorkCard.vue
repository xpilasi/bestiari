<script>
export default {
  name: 'WorkCard',
  props: {
    // Props requeridas
    projectName: {
      type: String,
      required: true
    },
    productType: {
      type: String,
      required: true
    },
    projectImage: {
      type: String,
      required: true
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
    showOverlay: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template>
  <div :class="`relative ${cardWidth} ${cardHeight} bg-gray-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`">
    
    <!-- Imagen del proyecto -->
    <img :src="projectImage" 
         :alt="`${projectName} - ${productType}`"
         class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer">
    
    <!-- Overlay gradient (opcional) -->
    <div v-if="showOverlay" 
         class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300">
    </div>
    
    <!-- Contenido de texto -->
    <div :class="`absolute ${textPosition} ${textWidth} z-10`">
      <!-- Tipo de producto (como badge) -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 bg-gradient-to-r from-[#8E2DFE] to-[#E61655] text-white text-xs font-semibold rounded-full uppercase tracking-wide">
          {{ productType }}
        </span>
      </div>
      
      <!-- Nombre del proyecto -->
      <h3 :class="`text-white font-medium ${titleSize} leading-tight tracking-[-0.06em] mb-2`"
          style="font-family: Inter;">
        {{ projectName }}
      </h3>
      
      <!-- Indicador visual (opcional) -->
      <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="w-2 h-2 bg-[#FFD93B] rounded-full"></div>
        <span :class="`text-gray-300 ${subtitleSize} font-light`" style="font-family: Inter;">
          Ver proyecto
        </span>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
/* Optimización para transiciones suaves */
.group:hover img {
  filter: brightness(0.9) contrast(1.1);
}

/* Efecto adicional en hover */
.group:hover {
  box-shadow: 0px 8px 40px 0px rgba(142, 45, 254, 0.3);
}
</style> 