<script>
import ServicesHeroSection from '@/views/ServicesView/ServicesHeroSection.vue'
import ServicesListSection from '@/views/ServicesView/ServicesListSection.vue'
import ServicesContactPage from '@/views/ServicesView/ServicesContactPage.vue'
import SectionsNavigator from '@/components/SectionsNavigator.vue'

export default {
  name: 'ServicesView',
  components: {
    ServicesHeroSection,
    ServicesListSection,
    ServicesContactPage,
    SectionsNavigator
  },
  data() {
    return {
      isVisible: true,
      currentSection: 'services-hero',
      sections: [
        { id: 'services-hero', label: 'Inicio', icon: '🏠' },
        { id: 'services-list', label: 'Servicios', icon: '💼' },
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
      // Caso especial para services-hero: scroll al top de la página completa
      if (sectionId === 'services-hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      let element = document.getElementById(sectionId)
      if (!element) {
        element = document.querySelector(`[id="${sectionId}"]`)
      }
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },

    navigateToNextSection() {
      const currentIndex = this.sections.findIndex(section => section.id === this.currentSection)
      const nextIndex = (currentIndex + 1) % this.sections.length
      this.scrollToSection(this.sections[nextIndex].id)
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

      this.$nextTick(() => {
        this.sections.forEach(section => {
          const element = document.getElementById(section.id)
          if (element) {
            this.observer.observe(element)
          }
        })
      })
    }
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4 lg:px-48 2xl:px-80">
    <ServicesHeroSection />
    <ServicesListSection />
    <ServicesContactPage />

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
