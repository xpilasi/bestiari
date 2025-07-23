<script>
import SectionTitle from '@/components/SectionTitle.vue'
import pandaAvatarFaq from '@/assets/img/faq/panda-avatar-faq.png'

export default {
  name: 'HomeFAQSection',
  components: {
    SectionTitle
  },
  data() {
    return {
      sectionTitle: 'Preguntas Frecuentes',
      highlightedWord: 'Frecuentes',
      pandaAvatarFaq: pandaAvatarFaq,
      
      // FAQ data
      faqs: [
        {
          id: 1,
          question: '¿Cuánto tiempo toma desarrollar un proyecto web?',
          answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede tomar de 2-4 semanas, mientras que aplicaciones más complejas pueden requerir de 2-6 meses. Te proporcionamos un cronograma detallado después de evaluar tus necesidades específicas.',
          isOpen: false
        },
        {
          id: 2,
          question: '¿Ofrecen soporte y mantenimiento después del lanzamiento?',
          answer: 'Sí, ofrecemos planes de mantenimiento y soporte continuo. Esto incluye actualizaciones de seguridad, backups regulares, optimizaciones de rendimiento y soporte técnico. Tenemos diferentes planes que se adaptan a las necesidades de cada proyecto.',
          isOpen: false
        },
        {
          id: 3,
          question: '¿Trabajan con tecnologías específicas?',
          answer: 'Trabajamos con tecnologías modernas y probadas como Vue.js, React, Node.js, Python, y bases de datos como PostgreSQL y MongoDB. Elegimos la mejor tecnología según las necesidades de tu proyecto para garantizar escalabilidad y rendimiento óptimo.',
          isOpen: false
        },
        {
          id: 4,
          question: '¿Cuánto tiempo toma desarrollar un proyecto web?',
          answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede tomar de 2-4 semanas, mientras que aplicaciones más complejas pueden requerir de 2-6 meses. Te proporcionamos un cronograma detallado después de evaluar tus necesidades específicas.',
          isOpen: false
        },
        {
          id: 5,
          question: '¿Ofrecen soporte y mantenimiento después del lanzamiento?',
          answer: 'Sí, ofrecemos planes de mantenimiento y soporte continuo. Esto incluye actualizaciones de seguridad, backups regulares, optimizaciones de rendimiento y soporte técnico. Tenemos diferentes planes que se adaptan a las necesidades de cada proyecto.',
          isOpen: false
        },
        {
          id: 6,
          question: '¿Trabajan con tecnologías específicas?',
          answer: 'Trabajamos con tecnologías modernas y probadas como Vue.js, React, Node.js, Python, y bases de datos como PostgreSQL y MongoDB. Elegimos la mejor tecnología según las necesidades de tu proyecto para garantizar escalabilidad y rendimiento óptimo.',
          isOpen: false
        },
        {
          id: 7,
          question: '¿Trabajan con tecnologías específicas?',
          answer: 'Trabajamos con tecnologías modernas y probadas como Vue.js, React, Node.js, Python, y bases de datos como PostgreSQL y MongoDB. Elegimos la mejor tecnología según las necesidades de tu proyecto para garantizar escalabilidad y rendimiento óptimo.',
          isOpen: false
        },
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen
    }
  }
}
</script>

<template>
  <section id="faq" class="min-h-screen bg-gray-100 flex flex-col justify-center py-10 xl:py-30 px-4 xl:px-48 2xl:px-80">
    
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-start">
      
      <!-- Left Column: FAQ Content -->
      <div class="space-y-8">
        
        <!-- FAQ Title -->
        <div class="mb-12">
          <SectionTitle 
            :title="sectionTitle"
            :highlighted-word="highlightedWord"
            alignment="left"
            
          />
        </div>
        
        <!-- FAQ Items -->
        <div class="space-y-0">
          <div 
            v-for="(faq, index) in faqs"
            :key="faq.id"
            class="border-b border-gray-200 last:border-b-0"
          >
            <!-- Question -->
            <button
              @click="toggleFaq(index)"
              class="w-full py-6 flex items-center justify-between text-left group hover:bg-gray-50 transition-colors duration-200"
            >
              <h3 class="text-black font-medium text-base pr-4 leading-relaxed tracking-[-0.06em]"
                  style="font-family: Inter;">
                {{ faq.question }}
              </h3>
              
              <!-- Arrow Icon -->
              <div class="flex-shrink-0">
                <svg 
                  class="w-3 h-3 text-gray-600 transition-transform duration-200"
                  :class="{ 'rotate-180': faq.isOpen }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>
            
            <!-- Answer -->
            <div 
              v-show="faq.isOpen"
              class="pb-6 pr-8 transition-all duration-300 ease-in-out"
            >
              <p class="text-gray-600 font-light text-sm leading-relaxed"
                 style="font-family: Inter;">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Contact Card -->
      <div class="flex justify-center xl:justify-end">
        <div class="relative w-full max-w-[250px] h-[320px] rounded-2xl overflow-hidden shadow-2xl">
          
          <!-- Background Gradient -->
          <div class="absolute inset-0 bg-gradient-to-b from-blue-600 to-pink-500"></div>
          
          <!-- Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-pink-500 via-transparent to-transparent opacity-60"></div>
          
          <!-- Content Container -->
          <div class="relative h-full flex flex-col justify-between p-6">
            
            <!-- Top Section with Avatar and Title -->
            <div class="flex flex-col items-center text-center">
              
              <!-- Avatar Container -->
              <div class="relative mb-4">
                <div class="w-16 h-16 bg-white rounded-full overflow-hidden">
                  <img :src="pandaAvatarFaq" 
                       alt="Panda avatar"
                       class="w-20 h-24 object-cover -mt-2 -ml-3">
                </div>
                
                <!-- CODE label -->
                <div class="absolute -top-1 -right-1 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                  CODE
                </div>
              </div>
              
              <!-- Meeting Title -->
              <h3 class="text-white font-medium text-lg leading-tight tracking-[-0.06em] mb-6"
                  style="font-family: Inter;">
                Agenda una<br>reunión de 15<br>minutos
              </h3>
            </div>
            
            <!-- Bottom Section with Button and Email -->
            <div class="space-y-4">
              
              <!-- Contact Button -->
              <button class="w-full bg-white text-gray-700 font-semibold text-base py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                      style="font-family: Inter;">
                Contáctanos
              </button>
              
              <!-- Email Section -->
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <p class="text-white font-semibold text-sm tracking-[-0.06em]"
                     style="font-family: Inter;">
                    Prefires enviar un Email?
                  </p>
                  <p class="text-gray-200 font-normal text-xs tracking-[-0.06em]"
                     style="font-family: Inter;">
                    hola@bestiari.art
                  </p>
                </div>
                
                <!-- Arrow Icon -->
                <button class="w-5 h-5 bg-white rounded-full flex items-center justify-center ml-2 hover:scale-110 transition-transform duration-200">
                  <svg class="w-3 h-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animaciones suaves para el acordeón */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Efecto hover para la card de contacto */
.contact-card:hover {
  transform: translateY(-4px);
}
</style>
