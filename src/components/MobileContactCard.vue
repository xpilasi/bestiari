<script>
import EmailIcon from '@/assets/img/icons/email.svg'
import { ArrowRight } from 'lucide-vue-next'

export default {
  name: 'MobileContactCard',
  components: {
    EmailIcon,
    ArrowRight
  },
  props: {
    avatarImage: {
      type: String,
      required: true
    },
    gradientFrom: {
      type: String,
      default: 'from-blue-600'
    },
    gradientVia: {
      type: String,
      default: 'via-purple-600'
    },
    gradientTo: {
      type: String,
      default: 'to-pink-600'
    },
    overlayFrom: {
      type: String,
      default: 'from-pink-500'
    },
    gradientDirection: {
      type: String,
      default: 'vertical', // 'vertical' or 'diagonal'
      validator: (value) => ['vertical', 'diagonal'].includes(value)
    },
    title: {
      type: String,
      default: 'Agenda una reunión de 15 minutos'
    },
    buttonText: {
      type: String,
      default: 'Contáctanos'
    },
    emailText: {
      type: String,
      default: 'Prefieres enviar un Email?'
    },
    emailAddress: {
      type: String,
      default: 'hola@bestiari.art'
    }
  },
  computed: {
    backgroundGradient() {
      const direction = this.gradientDirection === 'diagonal' ? 'bg-gradient-to-br' : 'bg-gradient-to-b'
      return `${direction} ${this.gradientFrom} ${this.gradientVia} ${this.gradientTo}`
    },
    overlayGradient() {
      return `bg-gradient-to-t ${this.overlayFrom} via-transparent to-transparent`
    }
  },
  methods: {
    handleContactClick() {
      this.$emit('contact-click')
    },
    handleEmailClick() {
      this.$emit('email-click', this.emailAddress)
    }
  }
}
</script>

<template>
  <div class="relative w-full max-w-sm mx-auto h-auto min-h-[320px] rounded-2xl overflow-hidden shadow-xl">
    
    <!-- Background Gradient -->
    <div class="absolute inset-0" :class="backgroundGradient"></div>
    
    <!-- Overlay Gradient -->
    <div class="absolute inset-0 opacity-50" :class="overlayGradient"></div>
    
    <!-- Content Container -->
    <div class="relative h-full flex flex-col justify-between p-6">
      
      <!-- Top Section with Avatar and Title -->
      <div class="flex flex-col items-start text-center mb-6">
        
        <!-- Avatar Container -->
        <div class="relative mb-4">
          <div class="w-20 h-20 bg-white text rounded-full overflow-hidden shadow-lg">
            <img :src="avatarImage" 
                 alt="Avatar"
                 class="w-[300px]  object-cover ">
          </div>
        </div>
        
        <!-- Meeting Title -->
        <h3 class="text-white text-start font-medium text-2xl sm:text-3xl leading-tight tracking-tight mb-4"
            style="font-family: Inter;">
          {{ title }}
        </h3>
      </div>
      
      <!-- Bottom Section with Button and Email -->
      <div class="space-y-4">
        
        <!-- Contact Button -->
        <button 
          @click="handleContactClick"
          class="w-full bg-white text-gray-700 font-semibold text-lg py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
          style="font-family: Inter;">
          {{ buttonText }}
        </button>
        
        <!-- Email Section -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div class="flex items-center justify-between">
            <div class="flex items-center flex-1">
              <EmailIcon class="w-6 h-6 text-white flex-shrink-0"/>
              <div class="flex flex-col ml-3 flex-1 min-w-0">
                <p class="text-white font-normal text-sm tracking-tight"
                   style="font-family: Inter;">
                  {{ emailText }}
                </p>
                <p class="text-gray-200 font-light text-sm tracking-tight hover:text-white transition-colors duration-200 cursor-pointer truncate"
                   style="font-family: Inter;"
                   @click="handleEmailClick">
                  {{ emailAddress }}
                </p>
              </div>
            </div>
            
            <!-- Arrow Button -->
            <button 
              @click="handleEmailClick"
              class="w-10 h-10 bg-white rounded-full flex items-center justify-center ml-3 hover:scale-110 active:scale-95 transition-transform duration-200 touch-manipulation flex-shrink-0">
              <ArrowRight class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile-specific optimizations */
@media (max-width: 640px) {
  .touch-manipulation {
    touch-action: manipulation;
  }
}

/* Ensure proper touch targets */
button {
  min-height: 44px;
  min-width: 44px;
}
</style>
