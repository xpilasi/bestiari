<script>
import EmailIcon from '@/assets/img/icons/email.svg'
import { ArrowRight, Video } from 'lucide-vue-next'

export default {
  name: 'ContactCard',
  components: {
    EmailIcon,
    ArrowRight,
    Video
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
      default: 'vertical',
      validator: (value) => ['vertical', 'diagonal'].includes(value)
    },
    buttonText: {
      type: String,
      default: 'Contáctanos'
    },
    emailText: {
      type: String,
      default: '¿Prefieres enviar un Email?'
    },
    emailAddress: {
      type: String,
      default: 'contacto@bestiari.es'
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
    handleCalendlyClick() {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({ url: 'https://calendly.com/bestiariagencia/30min' })
      }
    },
    handleContactClick() {
      window.dispatchEvent(new CustomEvent('open-contact-modal'))
    },
    handleEmailClick() {
      window.location.href = `mailto:${this.emailAddress}`
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

    <!-- Content -->
    <div class="relative h-full flex flex-col justify-between p-6">

      <!-- Top: Avatar + Meeting Row -->
      <div class="flex flex-col items-start gap-4 mb-6">

        <!-- Avatar -->
        <div class="w-16 h-16 bg-white rounded-full overflow-hidden shadow-lg flex-shrink-0">
          <img :src="avatarImage" alt="Avatar" class="w-[300px] object-cover">
        </div>

        <!-- Meeting Row → Calendly -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 w-full">
          <button
            @click="handleCalendlyClick"
            class="w-full flex items-center justify-between cursor-pointer group touch-manipulation"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <Video class="w-6 h-6 text-white flex-shrink-0" />
              <span
                class="text-white font-medium text-xl sm:text-2xl leading-tight tracking-tight text-left"
                style="font-family: Inter;"
              >
                Agenda una reunión<br>de 30 minutos
              </span>
            </div>
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center ml-3 group-hover:scale-110 group-active:scale-95 transition-transform duration-200 flex-shrink-0">
              <ArrowRight class="w-5 h-5 text-gray-600" />
            </div>
          </button>
        </div>
      </div>

      <!-- Bottom: Contact button + Email -->
      <div class="space-y-4">

        <!-- Contáctanos -->
        <button
          @click="handleContactClick"
          class="w-full bg-white text-gray-700 cursor-pointer font-semibold text-lg py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation"
          style="font-family: Inter;"
        >
          {{ buttonText }}
        </button>

        <!-- Email Section -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div class="flex items-center justify-between">
            <div class="flex items-center flex-1 min-w-0">
              <EmailIcon class="w-6 h-6 text-white flex-shrink-0"/>
              <div class="flex flex-col ml-3 flex-1 min-w-0">
                <p class="text-white font-normal text-sm tracking-tight" style="font-family: Inter;">
                  {{ emailText }}
                </p>
                <p
                  class="text-gray-200 font-light text-sm tracking-tight hover:text-white transition-colors duration-200 cursor-pointer truncate"
                  style="font-family: Inter;"
                  @click="handleEmailClick"
                >
                  {{ emailAddress }}
                </p>
              </div>
            </div>
            <button
              @click="handleEmailClick"
              class="w-10 h-10 cursor-pointer bg-white rounded-full flex items-center justify-center ml-3 hover:scale-110 active:scale-95 transition-transform duration-200 touch-manipulation flex-shrink-0"
            >
              <ArrowRight class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  min-height: 44px;
  min-width: 44px;
}
</style>
