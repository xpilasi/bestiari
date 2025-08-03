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
  <div :class="`relative ${cardWidth} ${cardHeight} cursor-pointer rounded-2xl overflow-hidden   ease-in-out transition-all duration-300  group`">
    
    <!-- Imagen del proyecto -->
    <img :src="projectImage" 
         :alt="`${projectName} - ${productType}`"
         class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer">
    
    <!-- Overlay gradient (opcional) -->
    <div v-if="showOverlay" 
         class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80  transition-opacity duration-300">
    </div>
    
    <!-- Contenido de texto -->
    <div :class="`absolute ${textPosition} ${textWidth} z-10`">
      <!-- Tipo de producto (como badge) -->
      <div class="mb-3">
        <span class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
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

