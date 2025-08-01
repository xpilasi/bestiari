<script>
import SectionTitle from '@/components/SectionTitle.vue'
import CarouselContainer from '@/components/CarouselContainer.vue'
import WorkCard from '@/components/WorkCard.vue'

// Importar imágenes de ejemplo (puedes reemplazar con imágenes reales)
import project1Image from '@/assets/img/design/phones.png'
import project2Image from '@/assets/img/design/just-list.webp'
import project3Image from '@/assets/img/solutions/website.png'
import project4Image from '@/assets/img/solutions/web-app.png'
import project5Image from '@/assets/img/solutions/mobile-app.png'

export default {
  name: 'ProjectsWorkSection',
  components: {
    SectionTitle,
    CarouselContainer,
    WorkCard
  },
  mounted() {
    // Establecer ancho inicial y agregar listener para resize
    if (typeof window !== 'undefined') {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeUnmount() {
    // Remover listener
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  data() {
    return {
      sectionTitle: 'Nuestros proyectos destacados',
      highlightedWord: 'proyectos',
      
      // Carousel state
      currentIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
      windowWidth: 1024, // Valor por defecto
      
      // Datos de los proyectos
      projects: [
        {
          id: 1,
          projectName: 'E-commerce Moderno',
          productType: 'Web App',
          projectImage: project1Image
        },
        {
          id: 2,
          projectName: 'Dashboard Analytics',
          productType: 'Web App',
          projectImage: project2Image
        },
        {
          id: 3,
          projectName: 'Landing Corporativa',
          productType: 'Website',
          projectImage: project3Image
        },
        {
          id: 4,
          projectName: 'Sistema de Gestión',
          productType: 'Web App',
          projectImage: project4Image
        },
        {
          id: 5,
          projectName: 'App de Productividad',
          productType: 'Mobile App',
          projectImage: project5Image
        }
      ]
    }
  },
  computed: {
    // Responsive: número de cards por slide
    cardsPerSlide() {
      if (this.windowWidth >= 1280) return 4 // xl
      if (this.windowWidth >= 1024) return 3 // lg
      if (this.windowWidth >= 768) return 2  // md
      return 1 // mobile
    },
    
    // Ancho de cada slide
    slideWidth() {
      if (this.cardsPerSlide === 1) return 'w-full'
      if (this.cardsPerSlide === 2) return 'w-1/2'
      if (this.cardsPerSlide === 3) return 'w-1/3'
      if (this.cardsPerSlide === 4) return 'w-1/4'
      return 'w-full'
    },
    
    // Transform para el carrusel
    carouselTransform() {
      const percentage = (this.currentIndex * 100) / this.cardsPerSlide
      return `translateX(-${percentage}%)`
    },
    
    // Número total de slides
    totalSlides() {
      return Math.ceil(this.projects.length / this.cardsPerSlide)
    },
    
    // Índice máximo
    maxIndex() {
      return this.projects.length - this.cardsPerSlide
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex += this.cardsPerSlide
      }
    },
    
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex -= this.cardsPerSlide
      }
    },
    
    goToSlide(slideIndex) {
      this.currentIndex = slideIndex * this.cardsPerSlide
    },
    
    // Touch events
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX
    },
    
    handleTouchMove(e) {
      this.touchEndX = e.touches[0].clientX
    },
    
    handleTouchEnd() {
      if (!this.touchStartX || !this.touchEndX) return
      
      const distance = this.touchStartX - this.touchEndX
      const threshold = 50
      
      if (distance > threshold) {
        this.nextSlide()
      } else if (distance < -threshold) {
        this.prevSlide()
      }
      
      this.touchStartX = 0
      this.touchEndX = 0
    },
    
    handleResize() {
      // Actualizar windowWidth y ajustar currentIndex
      if (typeof window !== 'undefined') {
        this.windowWidth = window.innerWidth
        const newMaxIndex = this.projects.length - this.cardsPerSlide
        if (this.currentIndex > newMaxIndex) {
          this.currentIndex = Math.max(0, newMaxIndex)
        }
      }
    }
  }
}
</script>

<template>
  <section class="min-h-screen flex flex-col justify-center py-10 xl:py-20 px-4 xl:px-48 2xl:px-80">
    
    <!-- Título principal -->
    <div class="text-center mb-16">
      <SectionTitle 
        :title="sectionTitle"
        :highlighted-word="highlightedWord"
        alignment="center"
        title-size="text-3xl lg:text-4xl xl:text-5xl"
        title-color="text-black"
        max-width="max-w-4xl"
      />
    </div>

    <!-- Carousel personalizado para mostrar múltiples cards -->
    <div class="mb-20">
      <div class="relative overflow-hidden">
        
        <!-- Carousel Track -->
        <div 
          class="flex transition-transform duration-300 ease-out"
          :style="{ transform: carouselTransform }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div 
            v-for="(project, index) in projects" 
            :key="project.id"
            class="flex-shrink-0 px-3"
            :class="slideWidth"
          >
            <WorkCard
              :project-name="project.projectName"
              :product-type="project.productType"
              :project-image="project.projectImage"
              card-width="w-full"
              card-height="h-[400px]"
            />
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-black hover:bg-white text-white hover:text-black rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-white text-white hover:text-black rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex >= maxIndex }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Indicators -->
      <div class="flex justify-center mt-8 space-x-3">
        <button
          v-for="(_, index) in totalSlides"
          :key="index"
          @click="goToSlide(index)"
          class="h-2 rounded-full transition-all duration-300 cursor-pointer"
          :class="Math.floor(currentIndex / cardsPerSlide) === index
            ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-8 shadow-lg shadow-purple-500/30' 
            : 'bg-gray-300 hover:bg-gray-500 w-2 hover:w-4 hover:shadow-md'"
        ></button>
      </div>
    </div>

  </section>
</template>