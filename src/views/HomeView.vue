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
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen ">
    <HomeHeroSection />
    <HomeWhatWeDoSection />
    <HomePresentationSection />
    <HomeWhyUsSection />
    <HomeFAQSection />
  </div>
</template>