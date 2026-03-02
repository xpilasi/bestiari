<script>
import SectionTitle from '@/components/SectionTitle.vue'
import WorkCard from '@/components/WorkCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'

import activitierImage from '@/assets/img/proyectos/activitier.png'
import rockvibesImage from '@/assets/img/proyectos/rockvibes.png'
import goodRootsImage from '@/assets/img/proyectos/good-roots.png'
import easyBudgeImage from '@/assets/img/proyectos/easybudget.png'

export default {
  name: 'ProjectsWorkSection',
  components: {
    SectionTitle,
    WorkCard,
    ProjectModal
  },
  mounted() {
    if (typeof window !== 'undefined') {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  data() {
    return {
      sectionTitle: 'Nuestros proyectos destacados',
      highlightedWord: 'proyectos',

      // Modal state
      selectedProject: null,
      showModal: false,

      // Carousel state
      currentIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
      windowWidth: 1024,

      projects: [
        {
          id: 1,
          projectName: 'Activitier',
          productType: 'Web App',
          projectImage: activitierImage,
          modalDescription: 'Activitier es una plataforma de gestión de actividades diseñada para hoteles boutique y alojamientos que ofrecen experiencias a sus huéspedes. Permite coordinar de forma ágil el catálogo de actividades disponibles, la disponibilidad de instructores externos y las reservas de los clientes, todo desde un único panel de control. El resultado: menos gestión manual, menos emails de ida y vuelta, y una experiencia más profesional tanto para el equipo del hotel como para los huéspedes que quieren reservar una excursión, una clase de yoga o cualquier otra actividad con solo unos clics.',
          modalFeatures: [
            'Accesible desde móvil, tablet y computadora',
            'Sin descargas ni actualizaciones para el usuario',
            'Cada cliente tiene su espacio y acceso personalizado',
            
          ],
          modalUrl: 'https://absmanager.netlify.app/' // Reemplazar con URL real del proyecto
        },
        {
          id: 2,
          projectName: 'Rock Vibes',
          productType: 'Website',
          projectImage: rockvibesImage,
          modalDescription: 'Rock Vibes es el sitio web oficial del Rock Vibes Climbing Center de Bilbao: un espacio digital donde los amantes de la escalada pueden descubrir las instalaciones del centro, consultar los servicios disponibles (clases, abonos, pases de día, entrenamiento personal y eventos privados), ver las últimas noticias y ponerse en contacto fácilmente. Diseñado con la estética y el espíritu de la escalada, la web refleja la identidad del centro y facilita que tanto nuevos visitantes como socios habituales encuentren todo lo que necesitan en un solo lugar.',
          modalFeatures: [
            'Diseño premium que transmite profesionalismo',
            'Multilenguaje: Español, Inglés',
            'Adaptada perfectamente a móvil y escritorio',
            'Carga ultra rápida para no perder visitas'
          ],
          modalUrl: 'https://rock-vibes.netlify.app/' // Reemplazar con URL real del proyecto
        },
        {
          id: 3,
          projectName: 'Good Roots',
          productType: 'Website',
          projectImage: goodRootsImage,
          modalDescription: 'Good Roots es el sitio web de un restaurante de comida saludable con varios locales en España. La web permite a los clientes explorar el menú, reservar mesa y descubrir cada local, todo con un diseño moderno que transmite a la perfección la filosofía del restaurante: ingredientes naturales, cocina honesta y un estilo de vida consciente.',
          modalFeatures: [
            'Catálogo completo de productos o servicios',
            'Formularios de contacto y solicitud de cotización',
            'Integración con redes sociales y WhatsApp',
            'Analíticas para entender a tus visitantes'
          ],
          modalUrl: '#' // Reemplazar con URL real del proyecto
        },
        {
          id: 4,
          projectName: 'Easy Budget',
          productType: 'Mobile App',
          projectImage: easyBudgeImage,
          modalDescription: 'EasyBudget es una app móvil para crear y gestionar listas de la compra con control de presupuesto integrado. Permite organizar los productos por categorías, calcular totales automáticamente y compartir las listas con otras personas al instante a través de WhatsApp u otras apps, para que todos puedan ver y usar la misma lista en tiempo real.',
          modalFeatures: [
    
            'Control de presupuesto en tiempo real',
            'Seguimiento de precios de productos',
            'Compartir listas con otras personas a través de WhatsApp',
          ],
          modalUrl: '#' // Reemplazar con URL real del proyecto
        }
      ]
    }
  },
  computed: {
    cardsPerSlide() {
      if (this.windowWidth >= 1280) return 4
      if (this.windowWidth >= 1024) return 3
      if (this.windowWidth >= 768) return 2
      return 1
    },
    slideWidth() {
      if (this.cardsPerSlide === 1) return 'w-full'
      if (this.cardsPerSlide === 2) return 'w-1/2'
      if (this.cardsPerSlide === 3) return 'w-1/3'
      if (this.cardsPerSlide === 4) return 'w-1/4'
      return 'w-full'
    },
    carouselTransform() {
      const percentage = (this.currentIndex * 100) / this.cardsPerSlide
      return `translateX(-${percentage}%)`
    },
    totalSlides() {
      return Math.ceil(this.projects.length / this.cardsPerSlide)
    },
    maxIndex() {
      return Math.max(0, this.projects.length - this.cardsPerSlide)
    }
  },
  methods: {
    openModal(project) {
      this.selectedProject = project
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      setTimeout(() => { this.selectedProject = null }, 300)
    },
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
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX
    },
    handleTouchMove(e) {
      this.touchEndX = e.touches[0].clientX
    },
    handleTouchEnd() {
      if (!this.touchStartX || !this.touchEndX) return
      const distance = this.touchStartX - this.touchEndX
      if (distance > 50) this.nextSlide()
      else if (distance < -50) this.prevSlide()
      this.touchStartX = 0
      this.touchEndX = 0
    },
    handleResize() {
      if (typeof window !== 'undefined') {
        this.windowWidth = window.innerWidth
        if (this.currentIndex > this.maxIndex) {
          this.currentIndex = Math.max(0, this.maxIndex)
        }
      }
    }
  }
}
</script>

<template>
  <section id="projects-work" class="min-h-screen flex flex-col justify-center py-10 xl:py-20">

    <!-- Título -->
    <div class="text-center mb-16 px-4 xl:px-48 2xl:px-80">
      <SectionTitle
        :title="sectionTitle"
        :highlighted-word="highlightedWord"
        alignment="center"
        title-size="text-3xl lg:text-4xl xl:text-5xl"
        title-color="text-black"
        max-width="max-w-4xl"
      />
    </div>

    <!-- Carousel -->
    <div class="mb-20 w-full">
      <div class="relative overflow-hidden">

        <!-- Track -->
        <div
          class="flex transition-transform duration-300 ease-out"
          :style="{ transform: carouselTransform }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div
            v-for="project in projects"
            :key="project.id"
            class="flex-shrink-0 px-3 cursor-pointer"
            :class="slideWidth"
            @click="openModal(project)"
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

        <!-- Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-black cursor-pointer hover:bg-white text-white hover:text-black rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
          :class="{ 'opacity-40 pointer-events-none': currentIndex === 0 }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-black cursor-pointer hover:bg-white text-white hover:text-black rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
          :class="{ 'opacity-40 pointer-events-none': currentIndex >= maxIndex }"
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

    <!-- Modal -->
    <ProjectModal
      :project="selectedProject"
      :is-open="showModal"
      @close="closeModal"
    />

  </section>
</template>
