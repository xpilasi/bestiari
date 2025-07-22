<script>
export default {
  name: 'CarouselContainer',
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
    showArrows: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoplayInterval: null,
      touchStartX: 0,
      touchEndX: 0,
      isDragging: false
    }
  },
  computed: {
    totalItems() {
      return this.items.length
    },
    translateX() {
      return `translateX(-${this.currentIndex * 100}%)`
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
      this.currentIndex = Math.max(0, Math.min(index, this.totalItems - 1))
    },
    prevSlide() {
      this.currentIndex = this.currentIndex === 0 ? this.totalItems - 1 : this.currentIndex - 1
    },
    nextSlide() {
      this.currentIndex = this.currentIndex === this.totalItems - 1 ? 0 : this.currentIndex + 1
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide()
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
  <div class="relative w-full overflow-hidden">
    <!-- Carousel Wrapper -->
    <div 
      class="flex transition-transform duration-300 ease-out"
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
        class="w-full flex-shrink-0 flex justify-center px-6 py-4"
      >
        <slot :item="item" :index="index"></slot>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <template v-if="showArrows">
      <!-- Previous Arrow -->
      <button
        @click="prevSlide"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black hover:bg-white text-white hover:text-black rounded-full p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Next Arrow -->
      <button
        @click="nextSlide"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-white text-white hover:text-black rounded-full p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </template>

    <!-- Indicators -->
    <div v-if="showIndicators" class="flex justify-center mt-8 space-x-3">
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
</style> 