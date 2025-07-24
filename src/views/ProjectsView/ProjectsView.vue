<script>
import ProjectsHeroSection from '@/views/ProjectsView/ProjectsHeroSection.vue'
  import ProjectsContactPage from '@/views/ProjectsView/ProjectsContactPage.vue'
export default {
  name: 'ProjectsView',
  components: {
    ProjectsHeroSection,
    ProjectsContactPage
  }
}
</script>

<template>
  <div class="bg-bg-primary min-h-screen px-4  xl:px-48 2xl:px-80">
    <ProjectsHeroSection />
    <ProjectsContactPage />   
  </div>
</template>