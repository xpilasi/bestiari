<script>
import AboutHeroSection from '@/views/AboutView/AboutHeroSection.vue'
import AboutPresentationSection from '@/views/AboutView/AboutPresentationSection.vue' 
import AboutTeamSection from '@/views/AboutView/AboutTeamSection.vue'
export default {
  name: 'AboutView',
  components: {
    AboutHeroSection,
    AboutPresentationSection,
    AboutTeamSection
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4  xl:px-48 2xl:px-80">
    <AboutHeroSection />
    <AboutTeamSection />
    <AboutPresentationSection />
    
  </div>
</template>