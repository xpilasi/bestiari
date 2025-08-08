<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SectionSubTitle from '@/components/SectionSubTitle.vue'
import TeamCard from '@/components/TeamCard.vue'
import modernFer from '@/assets/img/team/fer-4.png'
import modernXavi from '@/assets/img/team/xavi-4.png'
import xaviImage from '@/assets/img/team/xavi-img.png'
import ModernTeamCard from '@/components/ModernTeamCard.vue'
import MobileModernTeamCard from '@/components/MobileModernTeamCard.vue'
// Import team member images (you'll need to add the actual image files)
// import ferImage from '@/assets/img/team/fer.jpg'

export default {
  name: 'AboutTeamSection',
  components: {
    SectionTitle,
    SectionSubTitle,
    TeamCard,
    ModernTeamCard,
    MobileModernTeamCard
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
      sectionTitle: 'Las personas que hacen que las ideas sucedan',
      sectionSubtitle: 'Los detalles marcan la diferencia. Contar con sitios de calidad o aplicaciones que faciliten el acceso a tus servicios potencia la fidelización e impulsa el crecimiento de tu negocio.',
      highlightedWord: 'ideas',
      
      // Carousel state
      currentIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
      windowWidth: 1024, // Valor por defecto
      // Team members data
      teamMembers: [
        {
          id: 1,
          name: 'Fer',
          role: 'Project Manager / Psicóloga',
          image: modernFer, // You'll need to add this image
          gradientFrom: 'from-transparent',
          gradientVia: 'via-red-500',
          gradientTo: 'to-red-500',
          description: 'Fer es una psicóloga con experiencia en el campo de la psicología clínica y la psicología del trabajo. Tiene un fuerte compromiso con la calidad y el bienestar de sus clientes y colaboradores.',
          linkedin: 'https://www.linkedin.com/in/fernanda-bravo-luengo/',
          profileImageWidth: '',
          profileImageWidthMobile: '',
          profileImageHeight: 'h-full bg-gradient-to-br from-yellow-400 to-orange-800 w-full',
          profileImageHeightMobile: 'h-full bg-gradient-to-br from-red-400 to-orange-600 w-full',
          overlay: 'bg-gradient-to-b from-transparent via-transparent to-black/90 w-full'
        },
        {
          id: 2,
          name: 'Xavi',
          role: 'Desarrollador / Ing. Comercial',
          image:  modernXavi, // You'll need to add this image
          gradientFrom: 'from-transparent',
          gradientVia: 'via-amber-500',
          gradientTo: 'to-teal-500',
          description: 'Xavi es un desarrollador con experiencia en el campo de la programación y la ingeniería de software. Tiene un fuerte compromiso con la calidad y el bienestar de sus clientes y colaboradores.',
          linkedin: 'https://www.linkedin.com/in/xavierpilasi/?locale=en_US',
          profileImageWidth: '',
          profileImageWidthMobile: '',
          profileImageHeight: 'h-full bg-gradient-to-br from-red-400 to-orange-600 w-full',
          profileImageHeightMobile: 'h-full ',
          overlay: 'bg-gradient-to-b from-transparent via-transparent to-black/90 w-full'
        }
        // Add more team members here as needed
      ]
    }
  },
  computed: {
    // Solo usar carousel en tablet/mobile (menor a 1024px)
    isCarouselMode() {
      return this.windowWidth < 1024
    },
    
    // Responsive: número de cards por slide (solo para tablet/mobile)
    cardsPerSlide() {
      if (!this.isCarouselMode) return this.teamMembers.length // Desktop: mostrar todas
      if (this.windowWidth >= 768) return 1  // Tablet: 1 card
      return 1 // Mobile: 1 card
    },
    
    // Ancho de cada slide
    slideWidth() {
      if (!this.isCarouselMode) return 'w-auto' // Desktop: ancho automático
      return 'w-full' // Tablet/Mobile: ancho completo
    },
    
    // Transform para el carrusel
    carouselTransform() {
      if (!this.isCarouselMode) return 'translateX(0)' // Desktop: sin transform
      const percentage = (this.currentIndex * 100) / this.cardsPerSlide
      return `translateX(-${percentage}%)`
    },
    
    // Número total de slides
    totalSlides() {
      if (!this.isCarouselMode) return 1
      return Math.ceil(this.teamMembers.length / this.cardsPerSlide)
    },
    
    // Índice máximo
    maxIndex() {
      if (!this.isCarouselMode) return 0
      return this.teamMembers.length - this.cardsPerSlide
    }
  },
  methods: {
    nextSlide() {
      if (!this.isCarouselMode) return
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex += this.cardsPerSlide
      }
    },
    
    prevSlide() {
      if (!this.isCarouselMode) return
      if (this.currentIndex > 0) {
        this.currentIndex -= this.cardsPerSlide
      }
    },
    
    goToSlide(slideIndex) {
      if (!this.isCarouselMode) return
      this.currentIndex = slideIndex * this.cardsPerSlide
    },
    
    // Touch events
    handleTouchStart(e) {
      if (!this.isCarouselMode) return
      this.touchStartX = e.touches[0].clientX
    },
    
    handleTouchMove(e) {
      if (!this.isCarouselMode) return
      this.touchEndX = e.touches[0].clientX
    },
    
    handleTouchEnd() {
      if (!this.isCarouselMode) return
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
        const newMaxIndex = this.teamMembers.length - this.cardsPerSlide
        if (this.currentIndex > newMaxIndex) {
          this.currentIndex = Math.max(0, newMaxIndex)
        }
      }
    }
  }
}

</script>

<template>
  <section id="team" class="min-h-screen  flex flex-col justify-start items-center py-10">
     <!-- Título principal -->
     <div class="text-center mb-10 flex flex-col gap-5">
        <SectionTitle 
          :title="sectionTitle"
          :highlighted-word="highlightedWord"
          alignment="center"

        />
        <!-- <div class="hidden xl:block">
          <SectionSubTitle
          :subtitle="sectionSubtitle"
          alignment="center"
          subtitle-color="text-gray-600"
          subtitle-size="text-lg"
          max-width="max-w-3xl"
        />
        </div> -->
        
       </div>

       <!-- Team Cards Section -->
       <!-- Desktop Layout (lg y superior) -->
       <div v-if="!isCarouselMode" class="flex flex-col xl:flex-row items-center justify-between gap-20 lg:gap-16">
         <div class="flex flex-wrap justify-center gap-8 mt-16">
           <ModernTeamCard 
             v-for="member in teamMembers"
             :profile-image-width="member.profileImageWidth"
             :profile-image-height="member.profileImageHeight"
             card-width="w-80"
             card-height="h-96"
             :key="member.id"
             :name="member.name"
             :role="member.role"
             :image="member.image"
             :gradient-from="member.gradientFrom"
             :gradient-via="member.gradientVia"
             :gradient-to="member.gradientTo"
             :description="member.description"
             :linkedin="member.linkedin"
           />
         </div>
       </div>

       <!-- Carousel Layout (tablet/mobile) -->
       <div v-else class="mb-20 w-full ">
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
               v-for="(member, index) in teamMembers" 
               :key="member.id"
               class="flex-shrink-0 px-3 flex justify-center"
               :class="slideWidth"
             >
               <MobileModernTeamCard
                 
                 card-width="w-full"
                 card-height="h-[500px]"
                 :profile-image-height-mobile="member.profileImageHeightMobile"
                 :profile-image-width-mobile="member.profileImageWidthMobile"
                 :name="member.name"
                 :role="member.role"
                 :image="member.image"
                 :gradient-from="member.gradientFrom"
                 :gradient-via="member.gradientVia"
                 :gradient-to="member.gradientTo"
                 :description="member.description"
                 :linkedin="member.linkedin"
                 :overlay="member.overlay"
               />
             </div>
           </div>

           <!-- Navigation Arrows -->
           <button
             @click="prevSlide"
             class="absolute left-2 top-1/2 -translate-y-1/2 bg-black cursor-pointer hover:bg-white text-white hover:text-black rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
             :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
           >
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
             </svg>
           </button>

           <button
             @click="nextSlide"
             class="absolute right-2 top-1/2 -translate-y-1/2 bg-black cursor-pointer hover:bg-white text-white hover:text-black rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
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
