<script>
import AboutHeroSection from '@/views/AboutView/AboutHeroSection.vue'
import AboutPresentationSection from '@/views/AboutView/AboutPresentationSection.vue' 
import AboutTeamSection from '@/views/AboutView/AboutTeamSection.vue'
import AboutValuesSection from '@/views/AboutView/AboutValuesSection.vue'
import AboutContactSection from '@/views/AboutView/AboutContactSection.vue'
export default {
  name: 'AboutView',
  components: {
    AboutHeroSection,
    AboutPresentationSection,
    AboutTeamSection,
    AboutValuesSection,
    AboutContactSection
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4  xl:px-48 2xl:px-80">
    <AboutHeroSection />
    <AboutPresentationSection />
    <AboutTeamSection />
    <AboutValuesSection />
    <AboutContactSection />
    
  </div>
</template>