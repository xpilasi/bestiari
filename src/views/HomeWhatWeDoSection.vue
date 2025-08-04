<script>
import SectionTitle from '@/components/SectionTitle.vue'
import ProductCard from '@/components/ProductCard.vue'
import MobileProductCard from '@/components/MobileProductCard.vue'
import fluidBgWebProduct from '@/assets/img/bg/fluid-bg-purple.png'
import fluidBgWebApp from '@/assets/img/bg/fluid-bg-2.png'
import fluidBgMobileApp from '@/assets/img/bg/fluid-bg-pink.png'
import websiteSolutionImg from '@/assets/img/solutions/website.png'
import mobileAppSolutionImg from '@/assets/img/solutions/mobile-app.png'
import webAppSolutionImg from '@/assets/img/solutions/web-app.png'
import SectionSubTitle from '@/components/SectionSubTitle.vue'

export default {
  name: 'HomeWhatWeDoSection',
  components: {
    SectionTitle,
    SectionSubTitle,
    ProductCard,
    MobileProductCard
  },
  data() {
    return {
      sectionTitle: 'Creamos soluciones atractivas, funcionales e intuitivas',
      sectionSubtitle: 'Los detalles marcan la diferencia. Contar con sitios de calidad o aplicaciones que faciliten el acceso a tus servicios potencia la fidelización e impulsa el crecimiento de tu negocio.',
      highlightedWord: 'soluciones',
      fluidBgMobileApp: fluidBgMobileApp,
      fluidBgWebApp: fluidBgWebApp,
      fluidBgWebProduct: fluidBgWebProduct,
      websiteSolutionImg: websiteSolutionImg,
      webAppSolutionImg: webAppSolutionImg,
      mobileAppSolutionImg: mobileAppSolutionImg,
      
      // Carrusel
      currentSlide: 0,
      isTransitioning: false,
      touchStartX: 0,
      touchEndX: 0,
      
      // Cards data para desktop y mobile
      cards: [
        {
          id: 1,
          title: 'Sitios\nComerciales',
          bgImage: fluidBgWebProduct,
          solutionImage: websiteSolutionImg,
          imageClasses: 'top-[10px] -right-[50px] h-[250px]',
          productType: 'Website'
        },
        {
          id: 2,
          title: 'Aplicaciones de\nGestión',
          bgImage: fluidBgWebApp,
          solutionImage: webAppSolutionImg,
          imageClasses: 'top-[45px] -right-[30px] h-[180px]',
          productType: 'Web App'
        },
        {
          id: 3,
          title: 'Aplicaciones\nPersonalizadas',
          bgImage: fluidBgMobileApp,
          solutionImage: mobileAppSolutionImg,
          imageClasses: 'top-[30px] -right-[30px] h-[280px]',
          productType: 'Mobile App'
        }
      ]
    }
  },
  computed: {
    totalSlides() {
      return this.cards.length;
    },
    carouselTransform() {
      return `translateX(-${this.currentSlide * 100}%)`;
    }
  },
  methods: {
    nextSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    },
    prevSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    },
    goToSlide(index) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentSlide = index;
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    handleTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },
    handleTouchEnd() {
      if (!this.touchStartX || !this.touchEndX) return;
      
      const distance = this.touchStartX - this.touchEndX;
      const threshold = 50;
      
      if (distance > threshold) {
        this.nextSlide();
      } else if (distance < -threshold) {
        this.prevSlide();
      }
      
      this.touchStartX = 0;
      this.touchEndX = 0;
    }
  }
}
</script>

<template>
  <section id="what-we-do" class="min-h-screen  flex flex-col justify-center gap-5 xl:justify-between py-10 xl:py-30 px-4 xl:px-48 2xl:px-80">
    <!-- Contenedor principal -->
    
      
      <!-- Título principal -->
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
        

      <!-- Desktop Cards Container (xl and up) -->
      <div class="hidden xl:flex justify-between pb-20 gap-10">
        <ProductCard
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :bg-image="card.bgImage"
          :solution-image="card.solutionImage"
          :image-classes="card.imageClasses"
          :product-type="card.productType"
        />
      </div>

      <!-- Mobile/Tablet Carousel (below xl) -->
      <div class="xl:hidden pb-20">
        <!-- Carousel Container -->
        <div class="relative overflow-hidden"
             @touchstart="handleTouchStart"
             @touchmove="handleTouchMove"
             @touchend="handleTouchEnd">
          
          <!-- Carousel Track -->
          <div class="flex transition-transform duration-300 ease-in-out"
               :style="{ transform: carouselTransform }">
            
            <!-- Dynamic Cards -->
            <MobileProductCard
              v-for="card in cards"
              :key="card.id"
              :title="card.title"
              :bg-image="card.bgImage"
              :solution-image="card.solutionImage"
              :image-classes="card.imageClasses"
              :product-type="card.productType"
              card-height="h-[450px]"
            /> 
          </div>
          
          <!-- Navigation Arrows -->
          <button @click="prevSlide"
                  class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button @click="nextSlide"
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        <!-- Carousel Indicators -->
        <div class="flex justify-center mt-8 space-x-3">
          <button v-for="(card, index) in cards" 
                  :key="index"
                  @click="goToSlide(index)"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  :class="currentSlide === index 
                    ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-8 shadow-lg shadow-purple-500/30' 
                    : 'bg-gray-300 hover:bg-gray-500 w-2 hover:w-4 hover:shadow-md'">
          </button>
        </div>
      </div>
    
  </section>
</template>