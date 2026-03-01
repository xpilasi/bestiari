<script>
import SectionTitle from '@/components/SectionTitle.vue'
import ProductCard from '@/components/ProductCard.vue'
import MobileProductCard from '@/components/MobileProductCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'
import SectionSubTitle from '@/components/SectionSubTitle.vue'
import websiteSolutionImg from '@/assets/img/solutions/website.png'
import dashboardImg from '@/assets/img/design/dashboard.png'
import appImg from '@/assets/img/design/app.png'

export default {
  name: 'HomeWhatWeDoSection',
  components: {
    SectionTitle,
    SectionSubTitle,
    ProductCard,
    MobileProductCard,
    ProjectModal
  },
  data() {
    return {
      sectionTitle: 'Creamos soluciones atractivas, funcionales e intuitivas',
      sectionSubtitle: 'Los detalles marcan la diferencia. Contar con sitios de calidad o aplicaciones que faciliten el acceso a tus servicios potencia la fidelización e impulsa el crecimiento de tu negocio.',
      highlightedWord: 'soluciones',

      // Modal state
      showModal: false,
      selectedCard: null,

      // Carrusel
      currentSlide: 0,
      isTransitioning: false,
      touchStartX: 0,
      touchEndX: 0,

      cards: [
        {
          id: 1,
          title: 'Sitios\nComerciales',
          bgImage: websiteSolutionImg,
          solutionImage: websiteSolutionImg,
          imageClasses: '-top-[220px] right-[0px] h-[800px]',
          productType: 'Website',
          overlay: 'bg-gradient-to-br from-indigo/200 via-orange-500/40 to-red-500',
          // Modal
          projectImage: websiteSolutionImg,
          projectName: 'Sitios Comerciales',
          modalDescription: 'La presencia digital que tu negocio merece. Un sitio comercial reúne todo lo que tus clientes necesitan saber: quién eres, qué ofreces y cómo contactarte. Diseñado para transmitir confianza, posicionarse en Google y convertir visitantes en clientes desde el primer clic.',
          modalFeatures: [
            'Diseño adaptado a tu marca e identidad',
            'Optimizado para aparecer en Google (SEO)',
            'Rápido y adaptado a todos los dispositivos',
            'Fácil de actualizar sin conocimientos técnicos'
          ],
          modalUrl: '/proyectos'
        },
        {
          id: 2,
          title: 'Aplicaciones de\nGestión',
          bgImage: dashboardImg,
          solutionImage: dashboardImg,
          imageClasses: 'top-[45px] -right-[30px] h-[180px]',
          productType: 'Web App',
          overlay: 'bg-gradient-to-br from-indigo/200 via-red-500/70 to-pink-500',
          // Modal
          projectImage: dashboardImg,
          projectName: 'Aplicaciones de Gestión',
          modalDescription: 'Una herramienta digital a medida que organiza y automatiza los procesos internos de tu negocio. Gestiona pedidos, clientes, inventarios o equipos desde cualquier navegador, sin instalar nada. Diseñada exactamente para cómo trabaja tu empresa.',
          modalFeatures: [
            'Accesible desde cualquier dispositivo y navegador',
            'Roles y permisos personalizados por usuario',
            'Reportes y métricas en tiempo real',
            'Integrable con tus herramientas actuales'
          ],
          modalUrl: '/proyectos'
        },
        {
          id: 3,
          title: 'Aplicaciones\nPersonalizadas',
          bgImage: appImg,
          solutionImage: appImg,
          imageClasses: 'top-[30px] -right-[30px] h-[280px]',
          productType: 'Mobile App',
          overlay: 'bg-gradient-to-br from-indigo/200 via-blue-500/70 to-purple-500',
          // Modal
          projectImage: appImg,
          projectName: 'Aplicaciones Personalizadas',
          modalDescription: 'Tu negocio en el bolsillo de tus clientes. Desarrollamos apps nativas para iOS y Android que ofrecen una experiencia fluida, rápida y memorable. Notificaciones, pagos, geolocalización — todo lo que necesitas para conectar con tus usuarios en cualquier momento.',
          modalFeatures: [
            'Disponible en iOS y Android',
            'Notificaciones push directas al usuario',
            'Funciona sin conexión a internet',
            'Integración con cámara, GPS y funciones nativas'
          ],
          modalUrl: '/proyectos'
        }
      ]
    }
  },
  computed: {
    totalSlides() {
      return this.cards.length
    },
    carouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`
    }
  },
  methods: {
    openModal(card) {
      this.selectedCard = card
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      setTimeout(() => { this.selectedCard = null }, 300)
    },
    nextSlide() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides
      setTimeout(() => { this.isTransitioning = false }, 300)
    },
    prevSlide() {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1
      setTimeout(() => { this.isTransitioning = false }, 300)
    },
    goToSlide(index) {
      if (this.isTransitioning) return
      this.isTransitioning = true
      this.currentSlide = index
      setTimeout(() => { this.isTransitioning = false }, 300)
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX
    },
    handleTouchEnd() {
      if (!this.touchStartX || !this.touchEndX) return
      const distance = this.touchStartX - this.touchEndX
      if (distance > 50) this.nextSlide()
      else if (distance < -50) this.prevSlide()
      this.touchStartX = 0
      this.touchEndX = 0
    }
  }
}
</script>

<template>
  <section id="what-we-do" class="min-h-screen flex flex-col justify-center gap-5 xl:justify-start py-10 xl:py-10 px-4 xl:px-48 2xl:px-80">

    <!-- Título -->
    <div class="text-center mb-10 flex flex-col gap-5">
      <SectionTitle
        :title="sectionTitle"
        :highlighted-word="highlightedWord"
        alignment="center"
      />
      <div class="hidden xl:block">
        <SectionSubTitle
          :subtitle="sectionSubtitle"
          alignment="center"
          subtitle-color="text-gray-600"
          subtitle-size="text-lg"
          max-width="max-w-3xl"
        />
      </div>
    </div>

    <!-- Desktop Cards (xl+) -->
    <div class="hidden xl:flex justify-between gap-10">
      <div
        v-for="card in cards"
        :key="card.id"
        class="flex-1 cursor-pointer"
        @click="openModal(card)"
      >
        <ProductCard
          :title="card.title"
          :bg-image="card.bgImage"
          :solution-image="card.solutionImage"
          :image-classes="card.imageClasses"
          :product-type="card.productType"
          :overlay="card.overlay"
        />
      </div>
    </div>

    <!-- Mobile/Tablet Carousel (below xl) -->
    <div class="xl:hidden pb-20 relative">
      <div
        class="relative overflow-hidden"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{ transform: carouselTransform }"
        >
          <div
            v-for="card in cards"
            :key="card.id"
            class="w-full flex-shrink-0"
            @click="openModal(card)"
          >
            <MobileProductCard
              :title="card.title"
              :bg-image="card.bgImage"
              :solution-image="card.solutionImage"
              :image-classes="card.imageClasses"
              :product-type="card.productType"
              card-height="h-[500px]"
              :overlay="card.overlay"
            />
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button
        @click="prevSlide"
        class="absolute -left-1 top-60 transform -translate-y-1/2 bg-black/60 cursor-pointer text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute -right-1 top-60 transform -translate-y-1/2 bg-black/60 cursor-pointer text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Indicators -->
      <div class="flex justify-center mt-8 space-x-3">
        <button
          v-for="(card, index) in cards"
          :key="index"
          @click="goToSlide(index)"
          class="h-2 rounded-full transition-all duration-300 cursor-pointer"
          :class="currentSlide === index
            ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-8 shadow-lg shadow-purple-500/30'
            : 'bg-gray-300 hover:bg-gray-500 w-2 hover:w-4 hover:shadow-md'"
        />
      </div>
    </div>

    <!-- Modal -->
    <ProjectModal
      :project="selectedCard"
      :is-open="showModal"
      @close="closeModal"
    />

  </section>
</template>
