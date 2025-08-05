<script>
import PresentationTitle from '@/components/PresentationTitle.vue'
import PhonesImg from '@/assets/img/design/phones.png'
import MobileImg from '@/assets/img/design/mobile-cool.png'

export default {
  name: 'AboutPresentationSection',
  components: {
    PresentationTitle,
    
  },
  data() {
    return {
      phonesImg: PhonesImg,
      mobileImg: MobileImg,
      presentationText: 'Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.',
      // Palabras que se van a destacar con cursiva
      highlightedWords: ['medida', 'consolidar'] 
    }
  }
}
</script>

<template>
  <section id="presentation" class="min-h-screen  flex items-center py-20">
    
      <div class="flex flex-col w-full lg:flex-row justify-between gap-16 items-center">
        
        <!-- Left Column: Mobile Card -->
        <div class="flex justify-center lg:justify-end w-full lg:w-2/4 ">
          <div class="relative w-full  lg:h-[500px] h-[250px] rounded-3xl overflow-hidden shadow-2xl">

            
            <img :src="mobileImg" alt="Phones" class="w-full h-full object-cover">
            
          </div>
        </div>
        
        <!-- Right Column: Presentation Title -->
        
        <div class="lg:w-2/4">
          <PresentationTitle 
            :text="presentationText"
            :highlighted-words="highlightedWords"
            max-width="max-w-full"
            padding=""
            margin=""
          />
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

/* Animación suave para elementos decorativos */
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
</style>