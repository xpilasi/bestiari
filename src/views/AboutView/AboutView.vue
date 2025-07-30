<script>
import AboutHeroSection from '@/views/AboutView/AboutHeroSection.vue'
import AboutPresentationSection from '@/views/AboutView/AboutPresentationSection.vue' 
import AboutTeamSection from '@/views/AboutView/AboutTeamSection.vue'
import AboutValuesSection from '@/views/AboutView/AboutValuesSection.vue'
import AboutContactSection from '@/views/AboutView/AboutContactSection.vue'
import SectionsNavigator from '@/components/SectionsNavigator.vue'

export default {
  name: 'AboutView',
  components: {
    AboutHeroSection,
    AboutPresentationSection,
    AboutTeamSection,
    AboutValuesSection,
    AboutContactSection,
    SectionsNavigator
  },
  data() {
    return {
      isVisible: true,
      currentSection: 'about-hero',
      sections: [
        { id: 'about-hero', label: 'Inicio', icon: '🏠' },
        { id: 'presentation', label: 'Nosotros', icon: '👥' },
        { id: 'team', label: 'Equipo', icon: '👨‍💼' },
        { id: 'values', label: 'Valores', icon: '⭐' },
        { id: 'contact', label: 'Contacto', icon: '📞' }
      ]
    }
  },
  mounted() {
    this.setupSectionObserver()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    scrollToSection(sectionId) {
      // Caso especial para about-hero: scroll al top de la página completa
      if (sectionId === 'about-hero') {
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
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.currentSection = entry.target.id
          }
        })
      }, options)
      
      this.sections.forEach(section => {
        const element = document.getElementById(section.id)
        if (element) {
          this.observer.observe(element)
        }
      })
    }
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4 xl:px-48 2xl:px-80">
    <!-- Secciones -->
    <AboutHeroSection />
    <AboutPresentationSection />
    <AboutTeamSection />
    <AboutValuesSection />
    <AboutContactSection />
    
    <!-- Sections Navigator -->
    <SectionsNavigator
      :sections="sections"
      :current-section="currentSection"
      :is-visible="isVisible"
      :last-section-id="'contact'"
      @navigate-to-next="navigateToNextSection"
      @navigate-to-section="scrollToSection"
    />
  </div>
</template>