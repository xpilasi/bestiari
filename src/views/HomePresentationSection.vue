<script>
import fluidBgPresentation from '@/assets/img/bg/fluid-bg-presentation.png'

export default {
  name: 'HomePresentationSection',
  data() {
    return {
      presentationText: 'Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.',
      fluidBgPresentation: fluidBgPresentation,
      // Palabras que se van a destacar con cursiva
      highlightedWords: ['medida', 'consolidar'] 
    }
  },
  computed: {
    processedPresentationText() {
      if (!this.highlightedWords || this.highlightedWords.length === 0) return this.presentationText;
      
      let processedText = this.presentationText;
      
      // Procesar cada palabra destacada
      this.highlightedWords.forEach(word => {
        // Regex que maneja tildes y acentos correctamente
        const regex = new RegExp(`(^|\\s)(${word})(\\s|$|[.,!?;:])`, 'gi');
        processedText = processedText.replace(regex, (match, before, word, after) => {
          return `${before}<span class="italic font-light text-4xl lg:text-5xl highlighted-word" style="font-family: 'Instrument Serif', serif;">${word}</span>${after}`;
        });
      });
      
      return processedText;
    }
  }
}
</script>

<template>
  <section class="min-h-screen  flex flex-col justify-center  py-10 xl:py-30  ">
    <!-- Contenedor principal -->
    <div class=" w-full relative">
      
      
      <!-- Sección de presentación con gradiente -->
      <div class="  h-[500px] overflow-hidden "
           style="background: linear-gradient(90deg, #560F61 0%, #E61655 50%, #FFD93B 100%);">
        
        <!-- Imagen de fondo fluida -->
        <img :src="fluidBgPresentation" 
             alt="Fluid background presentation"
             class="absolute inset-0 w-full h-full object-cover opacity-30">
        
                 <!-- Contenido del texto -->
         <div class="absolute bottom-15 max-w-4xl flex items-center px-4 xl:px-48 2xl:px-80">
           <h2 class="text-white text-4xl lg:text-5xl font-medium tracking-tighter   mb-6 max-w-3xl"
               style="font-family: Inter;"
               v-html="processedPresentationText">
           </h2>
         </div>
       
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilo para las palabras destacadas - Solo gradiente */
.highlighted-word {
  background: linear-gradient(135deg, #8E2DFE 0%, #E61655 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}
</style>