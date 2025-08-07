<script>
export default {
  name: 'ProfessionalCarousel',
  props: {
    items: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplayDelay: {
      type: Number,
      default: 3000
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    cardWidth: {
      type: String,
      default: 'w-80' // Ancho de cada tarjeta
    },
    spacing: {
      type: String,
      default: 'space-x-4' // Espaciado entre tarjetas
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoplayInterval: null,
      touchStartX: 0,
      touchEndX: 0,
      isDragging: false,
      containerRef: null
    }
  },
  computed: {
    totalItems() {
      return this.items.length
    },
    // Calcula el desplazamiento para mostrar una tarjeta completa y parte de la siguiente
    translateX() {
      const cardWidthPx = 320 // 80 * 4 = 320px (w-80 en Tailwind)
      const spacingPx = 16 // space-x-4 = 16px
      const offset = this.currentIndex * (cardWidthPx + spacingPx)
      return `translateX(-${offset}px)`
    },
    maxIndex() {
      // Permitir scroll hasta mostrar la última tarjeta
      return Math.max(0, this.totalItems - 1)
    }
  },
  mounted() {
    if (this.autoplay) {
      this.startAutoplay()
    }
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    goToSlide(index) {
      this.currentIndex = Math.max(0, Math.min(index, this.maxIndex))
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    nextSlide() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++
      }
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        if (this.currentIndex < this.maxIndex) {
          this.nextSlide()
        } else {
          this.currentIndex = 0 // Volver al inicio
        }
      }, this.autoplayDelay)
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
        this.autoplayInterval = null
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX
      this.isDragging = true
      this.stopAutoplay()
    },
    handleTouchMove(e) {
      if (!this.isDragging) return
      this.touchEndX = e.touches[0].clientX
    },
    handleTouchEnd() {
      if (!this.isDragging) return
      
      const touchDiff = this.touchStartX - this.touchEndX
      const threshold = 50 // minimum swipe distance
      
      if (Math.abs(touchDiff) > threshold) {
        if (touchDiff > 0) {
          this.nextSlide()
        } else {
          this.prevSlide()
        }
      }
      
      this.isDragging = false
      
      if (this.autoplay) {
        this.startAutoplay()
      }
    },
    handleMouseEnter() {
      this.stopAutoplay()
    },
    handleMouseLeave() {
      if (this.autoplay) {
        this.startAutoplay()
      }
    }
  }
}
</script>

<template>
  <div class="relative w-full">
    <!-- Carousel Container -->
    <div class="overflow-hidden px-4">
      <div 
        class="flex transition-transform duration-300 ease-out space-x-4"
        :style="{ transform: translateX }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- Carousel Items -->
        <div 
          v-for="(item, index) in items" 
          :key="index"
          :class="`${cardWidth} flex-shrink-0`"
        >
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <div class="flex justify-center space-x-4 mt-6">
      <!-- Previous Arrow -->
      <button
        @click="prevSlide"
        :disabled="currentIndex === 0"
        class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 transition-all duration-200"
        :class="currentIndex === 0 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Next Arrow -->
      <button
        @click="nextSlide"
        :disabled="currentIndex === maxIndex"
        class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 transition-all duration-200"
        :class="currentIndex === maxIndex 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md'"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- Indicators -->
    <div v-if="showIndicators" class="flex justify-center mt-6 space-x-2">
      <button
        v-for="(item, index) in items"
        :key="index"
        @click="goToSlide(index)"
        class="h-2 rounded-full transition-all duration-300 cursor-pointer"
        :class="index === currentIndex 
          ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-8 shadow-lg shadow-purple-500/30' 
          : 'bg-gray-300 hover:bg-gray-500 w-2 hover:w-4 hover:shadow-md'"
      ></button>
    </div>
  </div>
</template>

<style scoped>
/* Smooth scrolling for better touch experience */
.carousel-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Disable text selection during dragging */
.carousel-wrapper {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  display: none;
}
</style> 