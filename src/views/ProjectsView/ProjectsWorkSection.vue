<script>
import SectionTitle from '@/components/SectionTitle.vue'
import WorkCard from '@/components/WorkCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'

import activitierImage from '@/assets/img/proyectos/activitier.png'
import rockvibesImage from '@/assets/img/proyectos/rockvibes.png'
import goodRootsImage from '@/assets/img/proyectos/good-roots.png'
import gorillaImage from '@/assets/img/proyectos/gorilla_web2.png'

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
          projectName: 'Aplicación Web',
          productType: 'Web App',
          projectImage: activitierImage,
          modalDescription: 'Una aplicación web es tu negocio funcionando en internet, accesible desde cualquier dispositivo sin instalar nada. Tus clientes entran, interactúan y completan lo que necesitan al instante. Ideal para ofrecer servicios online, gestionar reservas, membresías, usuarios o cualquier proceso que hoy haces en persona o por teléfono.',
          modalFeatures: [
            'Accesible desde móvil, tablet y computadora',
            'Sin descargas ni actualizaciones para el usuario',
            'Cada cliente tiene su espacio y acceso personalizado',
            'Se conecta con pagos, calendarios, correo y más'
          ],
          modalUrl: '#' // Reemplazar con URL real del proyecto
        },
        {
          id: 2,
          projectName: 'Landing Corporativa',
          productType: 'Landing',
          projectImage: rockvibesImage,
          modalDescription: 'Tu carta de presentación en internet. Una landing corporativa comunica con claridad quiénes son, qué ofrecen y por qué elegirlos. Diseñada para causar una primera impresión impecable y convertir cada visita en un contacto o cliente potencial.',
          modalFeatures: [
            'Diseño premium que transmite profesionalismo',
            'Optimizada para aparecer en Google (SEO)',
            'Adaptada perfectamente a móvil y escritorio',
            'Carga ultra rápida para no perder visitas'
          ],
          modalUrl: '#' // Reemplazar con URL real del proyecto
        },
        {
          id: 3,
          projectName: 'Sitio Web Comercial',
          productType: 'Comercial',
          projectImage: goodRootsImage,
          modalDescription: 'Más que una página, es tu vendedor disponible las 24 horas. Un sitio web comercial concentra todo lo que tu negocio necesita: catálogo de productos o servicios, información clave, formas de contacto y herramientas para cerrar ventas. El hub central de tu presencia digital.',
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
          projectName: 'Aplicación Móvil',
          productType: 'Mobile App',
          projectImage: gorillaImage,
          modalDescription: 'Tu marca en el bolsillo de tus clientes. Una app móvil ofrece la experiencia más directa y personal que existe: notificaciones instantáneas, acceso sin internet, funciones nativas del teléfono y una experiencia fluida que hace que tus usuarios quieran volver. Disponible en iOS y Android.',
          modalFeatures: [
            'Disponible en iOS y Android',
            'Notificaciones push directas al usuario',
            'Funciona sin conexión a internet',
            'Experiencia nativa fluida y de alta velocidad'
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
