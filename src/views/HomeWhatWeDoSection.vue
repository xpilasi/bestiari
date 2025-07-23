<script>
import SectionTitle from '@/components/SectionTitle.vue'
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
    SectionSubTitle
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
      
      // Cards data
      cards: [
        {
          id: 1,
          title: 'Web\nProducto / servicio',
          bgImage: fluidBgWebProduct,
          solutionImage: websiteSolutionImg,
          imageClasses: 'absolute top-[10px] -right-[50px] object-cover rotate-[15deg] h-[250px]'
        },
        {
          id: 2,
          title: 'Web\nApp',
          bgImage: fluidBgWebApp,
          solutionImage: webAppSolutionImg,
          imageClasses: 'absolute top-[45px] -right-[30px] object-cover rotate-[15deg] h-[180px]'
        },
        {
          id: 3,
          title: 'Mobile\nApp',
          bgImage: fluidBgMobileApp,
          solutionImage: mobileAppSolutionImg,
          imageClasses: 'absolute top-[30px] -right-[30px] object-cover rotate-[15deg] h-[280px]'
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
      <div class="hidden xl:flex justify-between pb-20">
        
        <!-- Card 1: Web Producto/servicio -->
        <div class="relative w-[300px] h-[400px] bg-gray-300 rounded-2xl overflow-hidden">
          <!-- Imagen de fondo fluida -->
          <img :src="fluidBgWebProduct" 
               alt="Fluid background web product"
               class="absolute h-[500px] object-cover">
          
          <!-- Imagen del asistente/robot -->
          <img :src="websiteSolutionImg" 
               alt="Website solution"
               class="absolute top-[10px] -right-[50px] object-cover rotate-[15deg] h-[250px]">
          
          <!-- Texto -->
          <div class="absolute bottom-[16px] left-[30px] w-[160px] h-[84px]">
            <p class="text-white font-medium text-[25px] leading-[0.84em] tracking-[-0.06em]"
               style="font-family: Inter;">
              Web<br>Producto / servicio
            </p>
          </div>
        </div>
        
        <!-- Card 2: Web App-->
        <div class="relative w-[300px] h-[400px] bg-gray-300 rounded-2xl overflow-hidden">
          <!-- Imagen de fondo fluida -->
          <img :src="fluidBgWebApp" 
               alt="Fluid background web app"
               class="absolute h-[500px] object-cover">

          <!-- Imagen del asistente/robot -->
          <img :src="webAppSolutionImg" 
               alt="Web app solution"
               class="absolute top-[45px] -right-[30px] object-cover rotate-[15deg] h-[180px]">
          
          <!-- Texto -->
          <div class="absolute bottom-[16px] left-[30px] w-[160px] h-[84px]">
            <p class="text-white font-medium text-[25px] leading-[0.84em] tracking-[-0.06em]"
               style="font-family: Inter;">
              Web<br>App
            </p>
          </div>
        </div>
        
        <!-- Card 3: Mobile App -->
        <div class="relative w-[300px] h-[400px] bg-gray-300 rounded-2xl overflow-hidden">
          <!-- Imagen de fondo fluida -->
          <img :src="fluidBgMobileApp" 
               alt="Fluid background mobile app"
               class="absolute h-[500px] object-cover">
          
          <!-- Imagen del asistente/robot -->
          <img :src="mobileAppSolutionImg" 
               alt="Mobile app solution"
               class="absolute top-[30px] -right-[30px] object-cover rotate-[15deg] h-[280px]">
          
          <!-- Texto -->
          <div class="absolute bottom-[16px] left-[30px] w-[160px] h-[84px]">
            <p class="text-white font-medium text-[25px] leading-[0.84em] tracking-[-0.06em]"
               style="font-family: Inter;">
              Mobile<br>App
            </p>
          </div>
        </div>
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
            <div v-for="card in cards" 
                 :key="card.id"
                 class="w-full flex-shrink-0 px-4">
              <div class="relative w-full max-w-sm mx-auto h-[350px] md:h-[400px] bg-gray-300 rounded-2xl overflow-hidden">
                <!-- Imagen de fondo fluida -->
                <img :src="card.bgImage" 
                     alt="Fluid background"
                     class="absolute inset-0 w-full h-full object-cover">
                
                <!-- Imagen de la solución -->
                <img :src="card.solutionImage" 
                     :alt="card.title"
                     :class="card.imageClasses.replace('h-[250px]', 'h-[290px] md:h-[290px]').replace('h-[180px]', 'h-[200px] md:h-[200px]').replace('h-[280px]', 'h-[290px] md:h-[240px]')">
                
                <!-- Texto -->
                <div class="absolute bottom-[16px] left-[20px] md:left-[30px] w-[200px] h-[84px]">
                  <p class="text-white font-medium text-3xl md:text-2xl leading-[0.84em] tracking-[-0.06em]"
                     style="font-family: Inter;"
                     v-html="card.title.replace('\n', '<br>')">
                  </p>
                </div>
              </div>
            </div>
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