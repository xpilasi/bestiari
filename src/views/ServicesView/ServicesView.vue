<script>
import ServicesHeroSection from '@/views/ServicesView/ServicesHeroSection.vue'
import ServicesListSection from '@/views/ServicesView/ServicesListSection.vue'
import ServicesContactPage from '@/views/ServicesView/ServicesContactPage.vue'
export default {
  name: 'ServicesView',
  components: {
    ServicesHeroSection,
    ServicesListSection,
    ServicesContactPage
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4 lg:px-48 2xl:px-80">
    <ServicesHeroSection />
    <ServicesListSection />
    <ServicesContactPage />
  </div>
</template>
