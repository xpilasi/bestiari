<script>
import HomeHeroSection from '@/views/HomeHeroSection.vue'
import HomePresentationSection from '@/views/HomePresentationSection.vue'
import HomeWhatWeDoSection from '@/views/HomeWhatWeDoSection.vue'
export default {
  name: 'HomeView',
  components: {
    HomeHeroSection,
    HomePresentationSection,
    HomeWhatWeDoSection
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen ">
    <HomeHeroSection />
    <HomeWhatWeDoSection />
    <HomePresentationSection />
   
  </div>
</template>