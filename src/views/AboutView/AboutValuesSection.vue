<script>
import coolDesktopImg from '@/assets/img/design/orange-cool-desktop.png'
import SectionTitle from '@/components/SectionTitle.vue'
import FeatureWidget from '@/components/FeatureWidget.vue'
import ImageWidget from '@/components/ImageWidget.vue'
import CarouselContainer from '@/components/CarouselContainer.vue'

export default {
  name: 'AboutValuesSection',
  components: {
    SectionTitle,
    FeatureWidget,
    ImageWidget,
    CarouselContainer
  },
  data() {
    return {
      coolDesktopImg: coolDesktopImg,
      sectionTitle: 'Creamos con intención, trabajamos con valores',
      highlightedWord: 'valores',
      values: [
        {
          id: 1,
          number: '01',
          title: 'Transparencia',
          subtitle: 'Nos comunicamos sin rodeos. Plazos, presupuestos y alcances bien definidos desde el inicio. Sin ambigüedades ni sorpresas.'
        },
        {
          id: 2,
          number: '02',
          title: 'Calidad',
          subtitle: 'Cada línea de código, cada diseño y cada interacción está pensada para ofrecer la mejor experiencia posible.'
        },
        {
          id: 3,
          number: '03',
          title: 'Compromiso',
          subtitle: 'Tu éxito es nuestro éxito. Nos involucramos en cada proyecto como si fuera nuestro propio negocio.'
        }
      ]
    }
  }
}
</script>

<template>
  <section id="values" class="min-h-screen  flex flex-col justify-start py-10">
    <div class="max-w-7xl ">
      
      <!-- Section Title -->
      <div class="text-center mb-16">
        <SectionTitle 
          :title="sectionTitle"
          :highlighted-word="highlightedWord"
          alignment="left"
          max-width="max-w-2xl"

        />
      </div>
      
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left Column: Image -->
        <ImageWidget
          :src="coolDesktopImg"
          alt="Phones design"
          container-width="w-full"
            container-height="h-auto"
            width="w-full"
            height="h-[300px] lg:h-[450px]"
            image-width="w-full"
            image-height="h-full"
            object-fit="object-cover"
            object-position="object-center"
            border-radius="rounded-2xl"
            shadow="shadow-xl"
        />
        
        <!-- Right Column: Values Cards -->
        <div>
          
          <!-- Desktop: Grid Layout -->
          <div class="hidden lg:block space-y-8">
            <FeatureWidget
              v-for="value in values"
              :key="value.id"
              :number="value.number"
              :title="value.title"
              :subtitle="value.subtitle"
              number-color="text-pink-600"
              title-color="text-gray-800"
              subtitle-color="text-gray-600"
              number-size="text-3xl"
              title-size="text-xl"
              subtitle-size="text-base"
              max-width=""
              spacing="space-y-3"
            />
          </div>

          <!-- Mobile/Tablet: Carousel -->
          <div class="lg:hidden">
            <CarouselContainer
              :items="values"
              :autoplay="false"
              :autoplay-delay="4000"
              :show-indicators="true"
              :show-arrows="false"
            >
              <template #default="{ item }">
                <FeatureWidget
                  :number="item.number"
                  :title="item.title"
                  :subtitle="item.subtitle"
                  number-color="text-pink-600"
                  title-color="text-gray-800"
                  subtitle-color="text-gray-600"
                  number-size="text-3xl"
                  title-size="text-xl"
                  subtitle-size="text-base"
                  max-width="max-w-full"
                  spacing="space-y-3"
                  text-align="text-center"
                />
              </template>
            </CarouselContainer>
          </div>

        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Component-specific styles if needed */
</style> 
