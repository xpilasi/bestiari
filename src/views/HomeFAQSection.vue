<script>
import SectionTitle from '@/components/SectionTitle.vue'
import ContactCard from '@/components/ContactCard.vue'
import pandaAvatarFaq from '@/assets/img/faq/panda-avatar-faq.png'

export default {
  name: 'HomeFAQSection',
  components: {
    SectionTitle,
    ContactCard
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
    },
    handleContactClick() {
      // Handle contact button click - could open a modal, redirect, etc.
      console.log('Contact button clicked')
    },
    handleEmailClick(email) {
      // Handle email click - could copy to clipboard, open email client, etc.
      console.log('Email clicked:', email)
      // Example: open email client
      window.location.href = `mailto:${email}`
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
              class="w-full py-6 flex items-center justify-between text-left group cursor-pointer transition-colors duration-200"
            >
              <h3 class="text-black font-light text-base pr-4 leading-relaxed tracking-[-0.06em]"
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
            <transition name="accordion">
              <div 
                v-if="faq.isOpen"
                class="overflow-hidden"
              >
                <div class="pb-6 pr-8">
                  <p class="text-gray-500 font-extralight text-sm leading-tight"
                     style="font-family: Inter;">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      
      <!-- Right Column: Contact Card -->
      <div class="xl:flex justify-center xl:justify-end hidden  ">
        <ContactCard 
          :avatar-image="pandaAvatarFaq"
          gradient-from="from-blue-600"
          gradient-via="via-purple-600"
          gradient-to="to-pink-600"
          overlay-from="from-pink-500"
          @contact-click="handleContactClick"
          @email-click="handleEmailClick"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth accordion transitions */
.accordion-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.accordion-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.accordion-enter-from {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0.8);
}

.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0.8);
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 200px;
  opacity: 1;
  transform: scaleY(1);
}


</style>
