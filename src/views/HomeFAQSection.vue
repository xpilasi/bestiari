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
      
      // Modal state for mobile
      showModal: false,
      selectedFaq: null,
      isMobile: false,
      
      // FAQ data
      faqs: [
        {
          id: 1,
          question: '¿Qué tipo de soluciones desarrolláis?',
          answer: 'Nuestro foco es el software de gestión a medida: SaaS y web apps que automatizan procesos, centralizan tu información y digitalizan la operación de tu empresa. También creamos sitios comerciales de alta calidad y, cuando el proyecto lo pide, apps móviles.',
          isOpen: false
        },
        {
          id: 2,
          question: '¿Para qué tipo de empresas trabajáis?',
          answer: 'Trabajamos sobre todo con pequeñas y medianas empresas en crecimiento, con una operación real que quieren ordenar, automatizar y escalar. No hacemos plantillas genéricas: cada solución se construye a la medida de cómo funciona tu negocio.',
          isOpen: false
        },
        {
          id: 3,
          question: '¿Cuánto tiempo toma un proyecto?',
          answer: 'Depende del alcance. Un sitio comercial suele estar listo en 2-4 semanas; una web app o un SaaS a medida puede llevar de 2 a 6 meses según la complejidad. Tras una sesión de diagnóstico te entregamos un cronograma claro y por etapas.',
          isOpen: false
        },
        {
          id: 4,
          question: '¿Cómo es vuestro proceso de trabajo?',
          answer: 'Empezamos con una sesión de diagnóstico para entender tu operación y objetivos. A partir de ahí diseñamos la solución, la desarrollamos de forma iterativa con entregas frecuentes y la lanzamos contigo. Comunicación constante y sin sorpresas en todo el proceso.',
          isOpen: false
        },
        {
          id: 5,
          question: '¿Ofrecéis soporte y evolución después del lanzamiento?',
          answer: 'Sí. Tu software no se queda quieto: ofrecemos soporte continuo, mantenimiento, seguridad y desarrollo de nuevas funcionalidades a medida que tu negocio crece. Nos involucramos a largo plazo, como un socio tecnológico.',
          isOpen: false
        },
        {
          id: 6,
          question: '¿Con qué tecnologías trabajáis?',
          answer: 'Usamos tecnologías modernas y probadas (Vue.js, Node.js, Python, PostgreSQL, Supabase, entre otras) elegidas según las necesidades de cada proyecto. Cuidamos el diseño y la experiencia tanto como la ingeniería: interfaces claras, modernas y mobile-first.',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      // Para desktop: usar acordeón
      if (!this.isMobile) {
        this.faqs[index].isOpen = !this.faqs[index].isOpen
      } else {
        // Para mobile: abrir modal
        this.openModal(this.faqs[index])
      }
    },
    openModal(faq) {
      this.selectedFaq = faq
      this.showModal = true
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      this.selectedFaq = null
      // Restore body scroll
      document.body.style.overflow = 'auto'
    },
    checkIsMobile() {
      this.isMobile = window.innerWidth < 1024 // lg breakpoint
    },
    handleResize() {
      this.checkIsMobile()
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
  },
  mounted() {
    this.checkIsMobile()
    window.addEventListener('resize', this.handleResize)
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize)
    // Restore body scroll in case component is unmounted with modal open
    document.body.style.overflow = 'auto'
  }
}
</script>

<template>
  <section id="faq" class="lg:min-h-screen bg-gray-100 flex flex-col justify-start lg:justify-center pt-10 pb-20 lg:pt-0 lg:pb-0 px-4 lg:px-48 2xl:px-80">
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      
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
              
              <!-- Arrow Icon - Hidden on mobile, shown on desktop -->
              <div class="flex-shrink-0 hidden lg:block">
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
              
              <!-- Chevron Right Icon for mobile -->
              <div class="flex-shrink-0 lg:hidden">
                <svg 
                  class="w-4 h-4 text-gray-600"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
            
            <!-- Answer - Only visible on desktop -->
            <transition name="accordion">
              <div 
                v-if="faq.isOpen && !isMobile"
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
      <div class="lg:flex justify-center lg:justify-end hidden">
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

    <!-- Mobile Modal -->
    <teleport to="body">
      <transition name="modal">
        <div 
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click="closeModal"
        >
          <!-- Modal Backdrop -->
          <div class="absolute inset-0 bg-black/80 "></div>
          
          <!-- Modal Content -->
          <div 
            class="relative bg-white rounded-2xl max-w-sm w-full mx-4 p-6 shadow-2xl transform"
            @click.stop
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            
            <!-- Modal Content -->
            <div v-if="selectedFaq" class="pr-8">
              <!-- Question -->
              <h3 class="text-black font-medium text-lg mb-4 leading-tight tracking-[-0.06em]"
                  style="font-family: Inter;">
                {{ selectedFaq.question }}
              </h3>
              
              <!-- Answer -->
              <p class="text-gray-600 font-light text-sm leading-relaxed tracking-[-0.06em]"
                 style="font-family: Inter;">
                {{ selectedFaq.answer }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
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

/* Modal transitions */
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: scale(0.95) translateY(20px);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .relative {
  transform: scale(0.95) translateY(20px);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-enter-to .relative,
.modal-leave-from .relative {
  transform: scale(1) translateY(0);
}
</style>
