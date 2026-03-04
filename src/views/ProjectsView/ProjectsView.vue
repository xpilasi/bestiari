<script>
import ProjectsHeroSection from '@/views/ProjectsView/ProjectsHeroSection.vue'
import ProjectsContactPage from '@/views/ProjectsView/ProjectsContactPage.vue'
import ProjectsWorkSection from '@/views/ProjectsView/ProjectsWorkSection.vue'
import SectionsNavigator from '@/components/SectionsNavigator.vue'

export default {
  name: 'ProjectsView',
  components: {
    ProjectsHeroSection,
    ProjectsContactPage,
    ProjectsWorkSection,
    SectionsNavigator
  },
  data() {
    return {
      isVisible: true,
      currentSection: 'projects-hero',
      sections: [
        { id: 'projects-hero', label: 'Inicio', icon: '🏠' },
        { id: 'projects-work', label: 'Trabajos', icon: '💼' },
        { id: 'projects-contact', label: 'Contacto', icon: '📞' }
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
      // Caso especial para projects-hero: scroll al top de la página completa
      if (sectionId === 'projects-hero') {
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

      // Esperar a que los componentes se monten y luego observar las secciones
      this.$nextTick(() => {
        this.sections.forEach(section => {
          const element = document.getElementById(section.id)
          if (element) {
            this.observer.observe(element)
          } else {
            console.warn(`Section element not found: ${section.id}`)
          }
        })
      })
    }
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4 lg:px-48 2xl:px-80">
    <!-- Los IDs están ahora dentro de cada componente -->
    <ProjectsHeroSection />
    <ProjectsWorkSection />
    <ProjectsContactPage />

    <!-- Sections Navigator -->
    <SectionsNavigator
      :sections="sections"
      :current-section="currentSection"
      :is-visible="isVisible"
      :last-section-id="'projects-contact'"
      :dots="true"
      @navigate-to-next="navigateToNextSection"
      @navigate-to-section="scrollToSection"
    />
  </div>
</template>