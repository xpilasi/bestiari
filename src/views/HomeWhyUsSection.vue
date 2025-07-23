<script>
import SectionTitle from '@/components/SectionTitle.vue'
import SectionSubTitle from '@/components/SectionSubTitle.vue'
import WhyUsCard from '@/components/WhyUsCard.vue'
import CarouselContainer from '@/components/CarouselContainer.vue'

// Importar imágenes de fondo
import fluidBg1 from '@/assets/img/why-us/fluid-bg-1.png'
import fluidImg2 from '@/assets/img/why-us/fluid-img-2.png'
import fluidBgAbstract from '@/assets/img/bg/fluid-bg-2.png'
import fluidBgAbstract2 from '@/assets/img/why-us/fluid-bg-abstract.png'
import fluidBgAbstract3 from '@/assets/img/bg/fluid-bg.png'
import fluidBgAbstract4 from '@/assets/img/bg/fluid-bg-4.png'
import fluidBgAbstract5 from '@/assets/img/bg/fluid-bg-5.png'
import userFocusBg from '@/assets/img/why-us/user-focus-bg.png'

// Importar iconos SVG
import cloudIcon from '@/assets/img/why-us/cloud-icon.svg'
import briefcaseIcon from '@/assets/img/why-us/briefcase-icon.svg'
import userIcon from '@/assets/img/why-us/user-icon.svg'
import responsiveIconPrimary from '@/assets/img/why-us/responsive-icon-primary.svg'
import responsiveIconSecondary from '@/assets/img/why-us/responsive-icon-secondary.svg'
import puzzleIcon from '@/assets/img/why-us/puzzle-icon.svg'

export default {
  name: 'HomeWhyUsSection',
  components: {
    SectionTitle,
    SectionSubTitle,
    WhyUsCard,
    CarouselContainer
  },
  data() {
    return {
      sectionTitle: 'Utilizamos estándares de la industria, con interfaces y diseños modernos ',
      highlightedWord: 'modernos',
      sectionSubtitle: 'Los detalles marcan la diferencia. Contar con sitios de calidad o aplicaciones que faciliten el acceso a tus servicios potencia la fidelización e impulsa el crecimiento de tu negocio.',
      
      // Cards data
      cards: [
        {
          id: 1,
          title: 'Tecnología moderna',
          subtitle: 'Usamos las herramientas más actuales para crear webs y apps más rápidas, seguras y listas para escalar junto a tu negocio.',
          icon: puzzleIcon,
          bgImages: [fluidBgAbstract],
          bgPositions: [{ top: '-20px', left: '0px', width: '900px', height: '300px' }]
        },
        {
          id: 2,
          title: 'Visión de negocio',
          subtitle: 'Pensamos en cómo tu proyecto aporta valor real, conecta con clientes y apoya tus objetivos comerciales.',
          icon: briefcaseIcon,
          bgImages: [fluidBgAbstract2],
          bgPositions: [{ top: '-150px', left: '0px', height: '800px' }]
        },
        {
          id: 3,
          title: 'Foco en el usuario',
          subtitle: 'Interfaces claras y fáciles de usar, para que tus usuarios se sientan cómodos y tomen acción.',
          icon: userIcon,
          bgImages: [fluidBgAbstract3],
          bgPositions: [
            { top: '-250px', left: '0', height: '800px' },
            
          ]
        },
        {
          id: 4,
          title: 'Diseño responsivo',
          subtitle: 'Experiencia diseñada para ordenadores, móviles y tablets, todo enfocado en que tus clientes tengan una gran experiencia sin importar el dispositivo.',
          icons: [responsiveIconPrimary, responsiveIconSecondary],
          bgImages: [fluidBgAbstract4],
          bgPositions: [
            { top: '-740px', left: '', height: '1200px' },
            
          ]
        },
        {
          id: 5,
          title: 'Soluciones personalizadas',
          subtitle: 'Trabajo contigo para crear productos que se ajusten a las necesidades únicas de tu negocio y reflejen la esencia de tu marca y tus objetivos.',
          icon: puzzleIcon,
          bgImages: [fluidBgAbstract5],
          bgPositions: [{ top: '', left: '', height: '' }]
        }
      ]
    }
  }
}
</script>

<template>
  <section id="why-us" class="min-h-screen bg-bg-primary flex flex-col justify-center py-10 xl:py-30 px-4 xl:px-48 2xl:px-80">
    
    <!-- Header Section -->
    <div class="text-center mb-16">
      <SectionTitle 
        :title="sectionTitle"
        :highlighted-word="highlightedWord"
        alignment="center"
      />
      
      <div class="mt-6 hidden lg:block">
        <SectionSubTitle 
          :subtitle="sectionSubtitle"
          alignment="center"
          subtitle-color="text-gray-600"
          subtitle-size="text-lg"
          max-width="max-w-3xl"
        />
      </div>
    </div>

    <!-- Desktop Layout (lg and up) -->
    <div class="hidden lg:flex flex-wrap justify-between gap-4">
      <WhyUsCard
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :subtitle="card.subtitle"
        :icon="card.icon"
        :icons="card.icons"
        :bg-images="card.bgImages"
        :bg-positions="card.bgPositions"
      />
    </div>

    <!-- Mobile & Tablet Carousel (below lg) -->
    <div class="lg:hidden">
      <CarouselContainer 
        :items="cards"
        :autoplay="false"
        :show-indicators="true"
        :show-arrows="true"
      >
        <template #default="{ item }">
          <WhyUsCard
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :icons="item.icons"
            :bg-images="item.bgImages"
            :bg-positions="item.bgPositions"
          />
        </template>
      </CarouselContainer>
    </div>

  </section>
</template>