<script>
import ServicesHeroSection from '@/views/ServicesView/ServicesHeroSection.vue'
  import ServicesContactPage from '@/views/ServicesView/ServicesContactPage.vue'
export default {
  name: 'ServicesView',
  components: {
    ServicesHeroSection,
    ServicesContactPage
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4  xl:px-48 2xl:px-80">
    <ServicesHeroSection />
    <ServicesContactPage />
  </div>
</template>