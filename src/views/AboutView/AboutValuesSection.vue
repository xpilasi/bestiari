<script>
import phonesImg from '@/assets/img/design/phones.png'
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'AboutValuesSection',
  components: {
    SectionTitle
  },
  data() {
    return {
      phonesImg: phonesImg,
      sectionTitle: 'Creamos con intención, trabajamos con valores',
      highlightedWord: 'valores',
      values: [
        {
          id: 1,
          number: '01',
          title: 'Transparencia',
          description: 'Nos comunicamos sin rodeos. Plazos, presupuestos y alcances bien definidos desde el inicio. Sin ambigüedades ni sorpresas.'
        },
        {
          id: 2,
          number: '02',
          title: 'Calidad',
          description: 'Cada línea de código, cada diseño y cada interacción está pensada para ofrecer la mejor experiencia posible.'
        },
        {
          id: 3,
          number: '03',
          title: 'Compromiso',
          description: 'Tu éxito es nuestro éxito. Nos involucramos en cada proyecto como si fuera nuestro propio negocio.'
        }
      ]
    }
  }
}
</script>

<template>
  <section id="values" class="min-h-screen  flex flex-col justify-center py-20">
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
        <div class="flex justify-center lg:justify-start">
          <div class="relative w-full max-w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <img :src="phonesImg" 
                 alt="Phones design" 
                 class="w-full h-full object-cover">
          </div>
        </div>
        
        <!-- Right Column: Values Cards -->
        <div class="space-y-8">
          <div 
            v-for="value in values" 
            :key="value.id"
            class="space-y-4"
          >
            <!-- Value Number -->
            <div class="text-pink-600 text-3xl font-italic font-instrument-serif " 
                 >
              {{ value.number }}
            </div>
            
            <!-- Value Title -->
            <h3 class="text-gray-800 text-xl font-semibold tracking-tight leading-tight "
                style="font-family: Inter;">
              {{ value.title }}
            </h3>
            
            <!-- Value Description -->
            <p class="text-gray-600 font-light text-base leading-relaxed tracking-tight max-w-md"
               style="font-family: Inter;">
              {{ value.description }}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Component-specific styles if needed */
</style> 
