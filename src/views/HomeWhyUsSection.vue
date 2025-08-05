<script>
import SectionTitle from '@/components/SectionTitle.vue'
import FeatureWidget from '@/components/FeatureWidget.vue'
import ImageWidget from '@/components/ImageWidget.vue'
import CarouselContainer from '@/components/CarouselContainer.vue'

// Importar la imagen de phones
import phonesImage from '@/assets/img/design/phones.png'
import justListImage from '@/assets/img/design/just-list.webp'

export default {
  name: 'HomeWhyUsSection',
  components: {
    SectionTitle,
    FeatureWidget,
    ImageWidget,
    CarouselContainer
  },
  data() {
    return {
      sectionTitle: 'Utilizamos estándares de la industria, con interfaces y diseños modernos ',
      highlightedWord: 'modernos',
      
      // Cards data basadas en los datos de Figma
      valuesCards: [
        {
          id: 1,
          number: '01',
          title: 'Tecnología moderna',
          subtitle: 'Usamos las herramientas más actuales para crear webs y apps más rápidas, seguras y listas para escalar junto a tu negocio.'
        },
        {
          id: 2,
          number: '02',
          title: 'Foco en el usuario',
          subtitle: 'Interfaces claras y fáciles de usar, para que tus usuarios se sientan cómodos y tomen acción.'
        },
        {
          id: 3,
          number: '03',
          title: 'Visión de negocio',
          subtitle: 'Pensamos en cómo tu proyecto aporta valor real, conecta con clientes y apoya tus objetivos comerciales.'
        },
        {
          id: 4,
          number: '04',
          title: 'Soluciones personalizadas',
          subtitle: 'Creamos productos que se ajusten a las necesidades únicas de tu negocio y reflejen la esencia de tu marca.'
        }
      ],
      
      // Imagen principal
      justListImage: justListImage
    }
  }
}
</script>

<template>
  <section id="why-us" class="min-h-screen  flex flex-col justify-start py-10  px-4 xl:px-48 2xl:px-80">
    
    <!-- Main Container based on Figma layout (852x606) -->
    <div class=" mx-auto w-full">
      
      <!-- Title Section (centered, full width) -->
      <div class="text-center  mb-10 lg:mb-20">
        <SectionTitle 
          :title="sectionTitle"
          :highlighted-word="highlightedWord"
          alignment="center"
          
        />
      </div>

      <!-- Main Content Area (675x398 from Figma) -->
      <div class="flex flex-col lg:flex-row items-start justify-between  gap-12">
        
        <!-- Left Side: Values Cards (372x245 from Figma) -->
        <div class="flex flex-col lg:max-w-2xl ">
          
          <!-- Desktop: Grid Layout -->
          <div class="hidden lg:grid lg:grid-cols-2 gap-8  lg:py-7 ">
            <FeatureWidget
              v-for="card in valuesCards"
              :key="card.id"
              :number="card.number"
              :title="card.title"
              number-color="text-pink-600"
              title-color="text-gray-800"
              subtitle-color="text-gray-600"
              number-size="text-3xl"
              title-size="text-xl"
              subtitle-size="text-base"
              max-width="max-w-5xl"
              spacing="space-y-3"
              :subtitle="card.subtitle"
            />
          </div>

          <!-- Mobile/Tablet: Carousel -->
          <div class="lg:hidden">
            <CarouselContainer
              :items="valuesCards"
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

        <!-- Right Side: Image Widget - Desktop Only -->
        <div class="hidden lg:block flex-shrink-0  lg:w-[350px] xl:w-[400px] ">
          <ImageWidget
            :src="justListImage"
            alt="Just list"
            container-width="w-full"
            container-height="h-auto"
            width="w-full"
            height="h-[400px] lg:h-[450px]"
            image-width="w-full"
            image-height="h-full"
            object-fit="object-cover"
            object-position="object-center"
            border-radius="rounded-2xl"
            shadow="shadow-xl"
          />
        </div>

      </div>

      <!-- Image Widget - Mobile/Tablet Only -->
      <div class="lg:hidden mt-12 ">
        <ImageWidget
          :src="justListImage"
          alt="Just list"
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
    </div>

  </section>
</template>
