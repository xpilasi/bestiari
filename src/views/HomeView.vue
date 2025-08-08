<script>
import HomeHeroSection from '@/views/HomeHeroSection.vue'
import HomePresentationSection from '@/views/HomePresentationSection.vue'
import HomeWhatWeDoSection from '@/views/HomeWhatWeDoSection.vue'
import HomeWhyUsSection from '@/views/HomeWhyUsSection.vue'
import HomeFAQSection from '@/views/HomeFAQSection.vue'
import SectionsNavigator from '@/components/SectionsNavigator.vue'

export default {
  name: 'HomeView',
  components: {
    HomeHeroSection,
    HomePresentationSection,
    HomeWhatWeDoSection,
    HomeWhyUsSection,
    HomeFAQSection,
    SectionsNavigator
  },
  data() {
    return {
      isVisible: true,
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
    this.setupSectionObserver()
  },
  methods: {
    scrollToSection(sectionId) {
      // Caso especial para hero: scroll al top de la página completa
      if (sectionId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        return
      }
      
      // Intentar múltiples estrategias para otras secciones
      let element = document.getElementById(sectionId)
      
      if (!element) {
        element = document.querySelector(`[id="${sectionId}"]`)
      }
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    
    // Navegar a la siguiente sección
    navigateToNextSection() {
      const currentIndex = this.sections.findIndex(section => section.id === this.currentSection)
      const nextIndex = (currentIndex + 1) % this.sections.length
      const nextSection = this.sections[nextIndex]
      
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
  <div class="bg-bg-primary min-h-screen overflow-x-hidden">
    <HomeHeroSection />
    <HomeWhatWeDoSection />
    <HomePresentationSection />
    <HomeWhyUsSection />
    <HomeFAQSection />
    
    <!-- Sections Navigator -->
    <SectionsNavigator
      :sections="sections"
      :current-section="currentSection"
      :is-visible="isVisible"
      :last-section-id="'faq'"
      @navigate-to-next="navigateToNextSection"
      @navigate-to-section="scrollToSection"
    />
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