<script>
import SectionTitle from '@/components/SectionTitle.vue'
import FeatureWidget from '@/components/FeatureWidget.vue'
import ImageWidget from '@/components/ImageWidget.vue'
import MobileWhyUsCard from '@/components/MobileWhyUsCard.vue'

// Importar la imagen de phones
import phonesImage from '@/assets/img/design/phones.png'
import techImg from '@/assets/img/design/tech.png'
import userImg from '@/assets/img/design/user-min.png'
import tailoredImg from '@/assets/img/design/tailored.png'
import businessImg from '@/assets/img/design/business.png'
import justListImage from '@/assets/img/design/just-list.webp'

export default {
  name: 'HomeWhyUsSection',
  components: {
    SectionTitle,
    FeatureWidget,
    ImageWidget,
    MobileWhyUsCard,

  },
  data() {
    return {
      sectionTitle: 'Utilizamos estándares de la industria, con interfaces y diseños modernos ',
      highlightedWord: 'modernos',
      
      // Carrusel móvil
      currentSlide: 0,
      isTransitioning: false,
      touchStartX: 0,
      touchEndX: 0, 
      techImg: techImg,
      userImg: userImg,  
      tailoredImg: tailoredImg,
      businessImg: businessImg,
      // Cards data basadas en los datos de Figma
      valuesCards: [
        {
          id: 1,
          number: '01',
          title: 'Tecnología moderna',
          subtitle: 'Usamos las herramientas más actuales para crear webs y apps más rápidas, seguras y listas para escalar junto a tu negocio.', 
          image: techImg,
          bgGradientCard: 'bg-gradient-to-br from-indigo-200/80 to-blue-900'
        },
        {
          id: 2,
          number: '02',
          title: 'Foco en el usuario',
          subtitle: 'Interfaces claras y fáciles de usar, para que tus usuarios se sientan cómodos y tomen acción.',
          image: userImg,
          bgGradientCard: 'bg-gradient-to-br from-yellow-600/30 via-green-600/80 to-green-600'
        },
        {
          id: 3,
          number: '03',
          title: 'Visión de negocio',
          subtitle: 'Pensamos en cómo tu proyecto aporta valor real, conecta con clientes y apoya tus objetivos comerciales.',
          image: businessImg,
          bgGradientCard: 'bg-gradient-to-br from-orange-600/80   to-red-400'
        },
        {
          id: 4,
          number: '04',
          title: 'Personalización',
          subtitle: 'Creamos productos que se ajusten a las necesidades únicas de tu negocio y reflejen la esencia de tu marca.',
          image: tailoredImg,
          bgGradientCard: 'bg-gradient-to-br from-pink-300/70 to-pink-600'
        }
      ],
      
      // Imagen principal
      justListImage: justListImage
    }
  },
  computed: {
    totalSlides() {
      return this.valuesCards.length;
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
  <section id="why-us" class="min-h-screen flex flex-col justify-start py-10 px-4 xl:px-48 2xl:px-80 ">
    
    <!-- Main Container based on Figma layout (852x606) -->
    <div class="mx-auto w-full">
      
      <!-- Title Section (centered, full width) -->
      <div class="text-center mb-20 lg:mb-20">
        <SectionTitle 
          :title="sectionTitle"
          :highlighted-word="highlightedWord"
          alignment="center"
        />
      </div>

      <!-- Main Content Area (675x398 from Figma) -->
      <div class="flex flex-col lg:flex-row items-start justify-between lg:gap-12 ">
        
        <!-- Left Side: Values Cards (372x245 from Figma) -->
        <div class="flex flex-col w-full lg:max-w-2xl">
          
          <!-- Desktop: Grid Layout -->
          <div class="hidden lg:grid lg:grid-cols-2 gap-8 lg:py-7">
            <FeatureWidget
              v-for="card in valuesCards"
              :key="card.id"
              :number="card.number"
              :title="card.title"
              number-color="text-pink-600"
              title-color="text-gray-800"
              subtitle-color="text-gray-600"
              number-size="text-3xl"
              title-size="text-xl"
              subtitle-size="text-base"
              max-width="max-w-5xl"
              spacing="space-y-3"
              :subtitle="card.subtitle"
            />
          </div>

          <!-- Mobile/Tablet: Why Us Carousel -->
          <div class="lg:hidden pb-20 -mx-4">
            <!-- Carousel Container -->
            <div class="relative overflow-hidden w-full"
                 @touchstart="handleTouchStart"
                 @touchmove="handleTouchMove"
                 @touchend="handleTouchEnd">
              
              <!-- Carousel Track -->
              <div class="flex transition-transform duration-300 ease-in-out"
                   :style="{ transform: carouselTransform }">
                
                <!-- Dynamic Cards -->
                <MobileWhyUsCard
                  v-for="card in valuesCards"
                  :key="card.id"
                  :number="card.number"
                  :title="card.title"
                  :subtitle="card.subtitle"
                  card-height="h-[500px]"
                  card-max-width="max-w-none"
                  :bg-image="card.image"
                  :bg-gradient-card="card.bgGradientCard"
                />
              </div>
              
              <!-- Navigation Arrows -->
              <button @click="prevSlide"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button @click="nextSlide"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all z-10">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <!-- Carousel Indicators -->
            <div class="flex justify-center mt-7 space-x-3">
              <button v-for="(card, index) in valuesCards" 
                      :key="index"
                      @click="goToSlide(index)"
                      class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                      :class="currentSlide === index 
                        ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-8 shadow-lg shadow-purple-500/30' 
                        : 'bg-gray-300 hover:bg-gray-500 w-2 hover:w-4 hover:shadow-md'">
              </button>
            </div>
          </div>

        </div>

        <!-- Right Side: Image Widget - Desktop Only -->
        <div class="hidden lg:block flex-shrink-0 lg:w-[350px] xl:w-[400px]">
          <ImageWidget
            :src="justListImage"
            alt="Just list"
            container-width="w-full"
            container-height="h-auto"
            width="w-full"
            height="h-[400px] lg:h-[450px]"
            image-width="w-full"
            image-height="h-full"
            object-fit="object-cover"
            object-position="object-center"
            border-radius="rounded-2xl"
            shadow="shadow-xl"
          />
        </div>

      </div>

      <!-- Image Widget - Mobile/Tablet Only -->
      <div class="lg:hidden mt-12 hidden">
        <ImageWidget
          :src="justListImage"
          alt="Just list"
          container-width="w-full"
          container-height="h-auto"
          width="w-full"
          max-width=""
          height="h-[250px] md:h-[350px]"
          image-width="w-full"
          image-height="h-full"
          object-fit="object-cover"
          object-position="object-center"
          border-radius="rounded-2xl"
          shadow="shadow-xl"
        />
      </div>
    </div>

  </section>
</template>
