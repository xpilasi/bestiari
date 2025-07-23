<script>
import fluidBgPresentation from '@/assets/img/bg/fluid-bg-presentation.png'
import PresentationTitle from '@/components/PresentationTitle.vue'

export default {
  name: 'HomePresentationSection',
  components: {
    PresentationTitle
  },
  data() {
    return {
      presentationText: 'Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.',
      fluidBgPresentation: fluidBgPresentation,
      // Palabras que se van a destacar con cursiva
      highlightedWords: ['medida', 'consolidar'] 
    }
  }
}
</script>

<template>
  <section id="presentation" class="min-h-screen 0  flex flex-col justify-start items-start  gap-50">
   
   <div class="h-3 w-full bg-gradient-to-r from-blue-600 to-pink-600">

   </div>
      <!-- Contenido del texto -->
      <PresentationTitle 
        :text="presentationText"
        :highlighted-words="highlightedWords"
      />
       
  
  </section>
</template>

<style scoped>
/* Styles specific to HomePresentationSection if needed */
</style>