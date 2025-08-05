<script>
import PresentationTitle from '@/components/PresentationTitle.vue'
import PhonesImg from '@/assets/img/design/phones.png'
import MobileImg from '@/assets/img/design/mobile-cool.png'
import responsiveImg from '@/assets/img/design/tablet.png'
import ImageWidget from '@/components/ImageWidget.vue'

export default {
  name: 'HomePresentationSection',
  components: {
    PresentationTitle,
    ImageWidget
  },
  data() {
    return {
      phonesImg: PhonesImg,
      mobileImg: MobileImg,
      responsiveImg: responsiveImg,
      presentationText: 'Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.',
      // Palabras que se van a destacar con cursiva
      highlightedWords: ['medida', 'consolidar'] 
    }
  }
}
</script>

<template>
  <section id="presentation" class="min-h-screen min-h-[100dvh] flex flex-col justify-center lg:items-center py-10 scroll-mt-16 md:scroll-mt-0">
    
      <div class="flex flex-col w-full lg:flex-row justify-between gap-16 items-center px-4 xl:px-48 2xl:px-80">
        
        <!-- Left Column: Mobile Card -->
        <div class="lg:w-2/4">
          <PresentationTitle 
            :text="presentationText"
            :highlighted-words="highlightedWords"
            max-width="max-w-full"
            padding=""
            margin=""
          />
        </div>
        <div class="hidden lg:block justify-center lg:justify-end lg:w-[400px] xl:w-[450px] ">
          <ImageWidget
            :src="responsiveImg"
            container-class="bg-gradient-to-br from-red-400 to-fuchsia-900  rounded-2xl"
            alt="Phones design"
            container-width="w-full"
            container-height="h-auto"
            width="w-full"
            height="h-[200px] md:h-full"
            image-width="w-full"
            image-height="h-full"
            object-fit="object-cover"
            object-position="object-center"
            border-radius="rounded-2xl"
            shadow="shadow-xl"
          />
        </div>

      </div>

    <!-- Image Widget - Mobile/Tablet Only (fuera del contenedor con padding) -->
    <div class="lg:hidden mt-12 px-4">
      <ImageWidget
        :src="responsiveImg"
        alt="Tablet"
        container-class="bg-gradient-to-br from-red-400 to-fuchsia-900 rounded-2xl"
        container-width="w-full"
        container-height="h-auto"
        width="w-full"
        max-width=""
        height="h-[250px] md:h-[350px]"
        image-width="w-full"
        image-height="h-full"
        object-fit="object-cover"
        object-position="object-center"
        border-radius="rounded-2xl"
        shadow="shadow-xl"
      />
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