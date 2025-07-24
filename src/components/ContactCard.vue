<script>
import EmailIcon from '@/assets/img/icons/email.svg'
import { ArrowRight } from 'lucide-vue-next'

export default {
  name: 'ContactCard',
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
      default: 'Agenda una<br>reunión de 15<br>minutos'
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
  <div class="relative w-full xl:w-[350px] xl:h-[420px] h-[250px] rounded-2xl overflow-hidden shadow-2xl">
    
    <!-- Background Gradient -->
    <div class="absolute inset-0" :class="backgroundGradient"></div>
    
    <!-- Overlay Gradient -->
    <div class="absolute inset-0 opacity-60" :class="overlayGradient"></div>
    
    <!-- Content Container -->
    <div class="relative h-full flex flex-col justify-between p-8">
      
      <!-- Top Section with Avatar and Title -->
      <div class="flex flex-col items-start text-center">
        
        <!-- Avatar Container -->
        <div class="relative mb-4">
          <div class="w-24 h-24 bg-white rounded-full overflow-hidden">
            <img :src="avatarImage" 
                 alt="Avatar"
                 class="w-30 h-40 object-cover">
          </div>
        </div>
        
        <!-- Meeting Title -->
        <h3 class="text-white text-start mt-5 font-medium text-4xl leading-[35px] tracking-[-0.06em] mb-6"
            style="font-family: Inter;"
            v-html="title">
        </h3>
      </div>
      
      <!-- Bottom Section with Button and Email -->
      <div class="space-y-4">
        
        <!-- Contact Button -->
        <button 
          @click="handleContactClick"
          class="w-full bg-white text-gray-700 cursor-pointer font-semibold text-base py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          style="font-family: Inter;">
          {{ buttonText }}
        </button>
        
        <!-- Email Section -->
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-row">
            <EmailIcon class="w-8 h-8 pt-1"/>
            <div class="flex flex-col px-3 justify-between gap-0.5">
              <p class="text-white font-normal text-sm tracking-[-0.06em]"
                 style="font-family: Inter;">
                {{ emailText }}
              </p>
              <p class="text-gray-200 font-light text-sm tracking-[-0.06em] hover:text-white transition-all duration-200 cursor-pointer"
                 style="font-family: Inter;"
                 @click="handleEmailClick">
                {{ emailAddress }}
              </p>
            </div>
          </div>
          
          <!-- Arrow Icon -->
          <button 
            @click="handleEmailClick"
            class="w-10 h-10 cursor-pointer bg-white rounded-full flex items-center justify-center ml-2 hover:scale-110 transition-transform duration-200">
            <ArrowRight class="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
