<script>
import HomeHeroSection from '@/views/HomeHeroSection.vue'
import HomePresentationSection from '@/views/HomePresentationSection.vue'
import HomeWhatWeDoSection from '@/views/HomeWhatWeDoSection.vue'
import HomeWhyUsSection from '@/views/HomeWhyUsSection.vue'
import HomeFAQSection from '@/views/HomeFAQSection.vue'

export default {
  name: 'HomeView',
  components: {
    HomeHeroSection,
    HomePresentationSection,
    HomeWhatWeDoSection,
    HomeWhyUsSection,
    HomeFAQSection
  },
  data() {
    return {
      isVisible: false,
      currentSection: 'hero',
      sections: [
        { id: 'hero', label: 'Inicio', icon: '🏠' },
        { id: 'what-we-do', label: 'Servicios', icon: '💼' },
        { id: 'presentation', label: 'Nosotros', icon: '👥' },
        { id: 'why-us', label: 'Por qué elegirnos', icon: '⭐' },
        { id: 'faq', label: 'FAQ', icon: '❓' }
      ]
    }
  },
  mounted() {
    // Mostrar el botón inmediatamente para pruebas
    this.isVisible = true
    
    // Verificar que los elementos existen
    this.$nextTick(() => {
      this.sections.forEach(section => {
        const element = document.getElementById(section.id)
        console.log(`Elemento ${section.id}:`, element)
      })
    })
    
    // Configurar observer para detectar sección activa
    this.setupSectionObserver()
  },
  methods: {
    scrollToSection(sectionId) {
      console.log('Intentando navegar a:', sectionId)
      
      // Intentar múltiples estrategias
      let element = document.getElementById(sectionId)
      
      if (!element) {
        // Buscar por querySelector como fallback
        element = document.querySelector(`[id="${sectionId}"]`)
      }
      
      if (!element) {
        // Buscar por nombre de clase que contenga el ID
        element = document.querySelector(`[class*="${sectionId}"]`)
      }
      
      console.log('Elemento encontrado:', element)
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        console.error('Elemento no encontrado:', sectionId)
        // Fallback: scroll manual
        this.scrollToSectionFallback(sectionId)
      }
    },
    
    scrollToSectionFallback(sectionId) {
      // Mapeo de secciones a posiciones aproximadas
      const sectionPositions = {
        'hero': 0,
        'what-we-do': window.innerHeight,
        'presentation': window.innerHeight * 2,
        'why-us': window.innerHeight * 3,
        'faq': window.innerHeight * 4
      }
      
      const position = sectionPositions[sectionId]
      if (position !== undefined) {
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        })
        console.log('Usando fallback para:', sectionId, 'posición:', position)
      }
    },
    
    // Navegar a la siguiente sección
    navigateToNextSection() {
      const currentIndex = this.sections.findIndex(section => section.id === this.currentSection)
      const nextIndex = (currentIndex + 1) % this.sections.length
      const nextSection = this.sections[nextIndex]
      
      console.log('Navegando de', this.currentSection, 'a', nextSection.id)
      this.scrollToSection(nextSection.id)
    },
    
    setupSectionObserver() {
      const options = {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.currentSection = entry.target.id
            console.log('Sección activa cambiada a:', this.currentSection)
          }
        })
      }, options)
      
      // Observar todas las secciones
      this.sections.forEach(section => {
        const element = document.getElementById(section.id)
        if (element) {
          observer.observe(element)
        }
      })
    }
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen">
    <HomeHeroSection />
    <HomeWhatWeDoSection />
    <HomePresentationSection />
    <HomeWhyUsSection />
    <HomeFAQSection />
    
    <!-- Navigation Button - Fixed Bottom Center -->
    <div v-show="isVisible" class="fixed bottom-10 left-1/2 right-1/2 transform -translate-x-1/2 z-50">
      <div class="relative">
        <!-- Main Navigation Button -->
        <button 
          @click="navigateToNextSection()"
          class="group relative bg-transparent cursor-pointer from-purple-600 to-pink-500 text-black px-8 py-3 rounded-full shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 animate-bounce-subtle"
        >
          <div class="flex items-center space-x-2">
           
            <svg class="w-4 h-4 transform transition-transform duration-300" 
                 :class="currentSection === 'faq' ? 'rotate-180' : ''"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
          
          <!-- Pulse Ring Effect - Only on Hover -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
        </button>
        
        <!-- Section Dots -->
        <div class="absolute top-12 left-1/2  transform -translate-x-1/2 flex space-x-2">
          <!-- <button 
            v-for="section in sections" 
            :key="section.id"
            @click="scrollToSection(section.id)"
            class="h-2 rounded-full transition-all duration-200 hover:scale-125 group"
            :class="currentSection === section.id 
              ? 'bg-gradient-to-r from-[#8E2DFE] to-[#E61655] w-6 shadow-lg shadow-purple-500/30' 
              : 'bg-white/30 hover:bg-white/60 w-2 hover:w-4 cursor-pointer'"
            :title="section.label"
          >
            <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {{ section.icon }} {{ section.label }}
            </span>
          </button> -->
        </div>
        
        <!-- Debug Info (temporal) -->
        <!-- <div class="absolute -top-32 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-2 rounded opacity-75">
          Sección activa: {{ currentSection }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de rebote sutil */
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-8px) translateX(-50%);
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

/* Efecto de pulso para el anillo */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Hover effect para el botón principal */
.group:hover .animate-bounce-subtle {
  animation-play-state: paused;
}

/* Tooltip positioning */
.group:hover span {
  z-index: 60;
}
</style>