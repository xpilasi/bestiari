<script>
export default {
  name: 'ImageWidget',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    },
    containerClass: {
      type: String,
      default: ''
    },
    // Control del contenedor exterior
    containerWidth: {
      type: String,
      default: 'w-full'
    },
    containerHeight: {
      type: String,
      default: ''
    },
    containerMaxWidth: {
      type: String,
      default: ''
    },
    containerMaxHeight: {
      type: String,
      default: ''
    },
    containerMinWidth: {
      type: String,
      default: ''
    },
    containerMinHeight: {
      type: String,
      default: ''
    },
    imageContainerClass: {
      type: String,
      default: ''
    },
    imageClass: {
      type: String,
      default: ''
    },
    // Control independiente de la imagen
    imageWidth: {
      type: String,
      default: 'w-full'
    },
    imageHeight: {
      type: String,
      default: 'h-full'
    },
    // Control independiente de width
    width: {
      type: String,
      default: 'w-full'
    },
    maxWidth: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    // Control independiente de height
    height: {
      type: String,
      default: 'h-[500px]'
    },
    maxHeight: {
      type: String,
      default: ''
    },
    minHeight: {
      type: String,
      default: ''
    },
    // Estilos visuales
    borderRadius: {
      type: String,
      default: 'rounded-2xl'
    },
    shadow: {
      type: String,
      default: 'shadow-xl'
    },
    objectFit: {
      type: String,
      default: 'object-cover'
    },
    objectPosition: {
      type: String,
      default: 'object-center'
    },
    overflow: {
      type: String,
      default: 'overflow-hidden'
    },
    responsive: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedContainerClass() {
      // Siempre construir clases automáticamente, solo agregar si tienen valores
      const widthClasses = [this.containerWidth, this.containerMaxWidth || '', this.containerMinWidth || ''].filter(cls => cls.trim() !== '').join(' ');
      const heightClasses = [this.containerHeight, this.containerMaxHeight || '', this.containerMinHeight || ''].filter(cls => cls.trim() !== '').join(' ');
      const autoClasses = `${widthClasses} ${heightClasses}`.trim();
      
      // Si hay containerClass personalizada, combinarla con las automáticas
      if (this.containerClass) {
        return `${autoClasses} ${this.containerClass}`.trim();
      }
      
      return autoClasses;
    },
    computedImageContainerClass() {
      // Si se proporciona imageContainerClass personalizada, usarla
      if (this.imageContainerClass) {
        return `relative ${this.overflow} ${this.imageContainerClass}`;
      }
      
      // Construir clases automáticamente
      const baseClasses = 'relative';
      // Solo agregar maxWidth y minWidth si tienen valores
      const widthClasses = [this.width, this.maxWidth || '', this.minWidth || ''].filter(cls => cls.trim() !== '').join(' ');
      const heightClasses = [this.height, this.maxHeight || '', this.minHeight || ''].filter(cls => cls.trim() !== '').join(' ');
      const styleClasses = `${this.borderRadius} ${this.shadow} ${this.overflow}`;
      
      return `${baseClasses} ${widthClasses} ${heightClasses} ${styleClasses}`.trim();
    },
    computedImageClass() {
      // Si hay imageClass personalizada, usarla
      if (this.imageClass) {
        return this.imageClass;
      }
      
      // Construir clases automáticamente
      return `${this.imageWidth} ${this.imageHeight} ${this.objectFit} ${this.objectPosition}`;
    }
  }
}
</script>

<template>
  <div :class="computedContainerClass">
    <div :class="computedImageContainerClass">
      <img :src="src" 
           :alt="alt"
           :class="computedImageClass">
      
      <!-- Slot para contenido adicional sobre la imagen -->
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style> 