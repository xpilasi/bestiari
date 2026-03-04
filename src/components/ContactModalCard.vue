<script>
import emailjs from '@emailjs/browser'
import PandaAvatar from '@/assets/img/animals/panda-avatar.png'
import LogoBestiari from '@/assets/img/logos/logo-bestiari-dark.svg'

export default {
  name: 'ContactModalCard',
  emits: ['close'],
  components: {
    LogoBestiari
  },
  data() {
    return {
      formData: {
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      },
      submitting: false,
      submitted: false,
      error: false,
      PandaAvatar
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleOverlayClick(event) {
      if (event.target === event.currentTarget) {
        this.closeModal()
      }
    },
    async handleSubmit() {
      this.submitting = true
      this.error = false

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name: this.formData.nombre,
            email: this.formData.email,
            title: this.formData.asunto,
            message: this.formData.mensaje
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        this.submitted = true
      } catch {
        this.error = true
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<template>
  <!-- Modal Overlay -->
  <div
    @click="handleOverlayClick"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <!-- Modal Card -->
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">

      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 z-10 w-8 h-8 cursor-pointer hover:rotate-90 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex flex-col lg:flex-row">

        <!-- Left — Contact Info -->
        <div class="lg:w-80 w-full bg-gradient-to-br from-coolPurple to-coolPink p-6 lg:px-7 text-white relative rounded-2xl lg:flex lg:flex-col lg:justify-between">

          <div class="flex-col justify-between gap-2 hidden lg:flex">
            <div class="text-md font-bold tracking-tighter">Información de contacto</div>
            <p class="text-sm font-extralight leading-[13px] tracking-tight opacity-90">
              Estamos aquí para ayudarte a hacer crecer tu negocio digital.
            </p>
          </div>

          <div class="space-y-4 hidden lg:block">
            <!-- Email -->
            <div class="flex items-center gap-4">
              <div class="w-4 h-4 flex-shrink-0">
                <svg viewBox="0 0 18 18" fill="currentColor" class="w-full h-full">
                  <path d="M15.18 4.5H2.82C1.82 4.5 1.01 5.31 1.01 6.31L1 13.19C1 14.19 1.82 15 2.82 15H15.18C16.18 15 17 14.19 17 13.19V6.31C17 5.31 16.18 4.5 15.18 4.5ZM15.18 8.12L9 11.75L2.82 8.12V6.31L9 9.94L15.18 6.31V8.12Z"/>
                </svg>
              </div>
              <span class="text-sm font-bold leading-[19px] tracking-tighter">contacto@bestiari.es</span>
            </div>

            <!-- WhatsApp -->
            <div class="flex items-center gap-4">
              <div class="w-4 h-4 flex-shrink-0">
                <svg viewBox="0 0 18 18" fill="currentColor" class="w-full h-full">
                  <path d="M15.3 2.7C13.6 1 11.4 0.1 9 0.1C4.1 0.1 0.2 4 0.2 8.9C0.2 10.4 0.6 11.9 1.3 13.2L0.1 17.9L5 16.7C6.2 17.3 7.6 17.6 9 17.6C13.9 17.6 17.8 13.7 17.8 8.8C17.8 6.4 16.9 4.2 15.3 2.7ZM9 16.1C7.8 16.1 6.6 15.8 5.5 15.2L5.3 15.1L2.3 15.9L3.1 13L3 12.8C2.3 11.7 2 10.3 2 8.9C2 5 5.1 1.9 9 1.9C10.9 1.9 12.7 2.6 14.1 4C15.5 5.4 16.2 7.2 16.2 9.1C16.2 13 13.1 16.1 9 16.1Z"/>
                </svg>
              </div>
              <div class="text-sm font-bold leading-[19px] tracking-tighter">
                <div>+346326108171</div>
                <div>+346545342</div>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-center gap-4">
              <div class="w-4 h-4 flex-shrink-0">
                <svg viewBox="0 0 18 16" fill="currentColor" class="w-full h-full">
                  <path d="M9 0C5.7 0 3 2.7 3 6C3 10.5 9 16 9 16S15 10.5 15 6C15 2.7 12.3 0 9 0ZM9 8C7.9 8 7 7.1 7 6C7 4.9 7.9 4 9 4C10.1 4 11 4.9 11 6C11 7.1 10.1 8 9 8Z"/>
                </svg>
              </div>
              <span class="text-sm font-bold leading-[19px] tracking-tighter">Barcelona, ES</span>
            </div>
          </div>

          <!-- Avatar -->
          <div class="flex items-center justify-center w-full mt-6 lg:mt-0">
            <div class="w-30 h-30 bg-white rounded-full overflow-hidden relative">
              <img :src="PandaAvatar" alt="Avatar" class="absolute object-cover h-60" />
            </div>
          </div>
        </div>

        <!-- Right — Form or Success -->
        <div class="flex-1 p-6 lg:p-8 bg-white">

          <!-- Success State -->
          <div v-if="submitted" class="h-full min-h-[300px] flex flex-col items-center justify-center text-center py-8">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#8E2DFE] to-[#E61655] flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-black tracking-tight mb-3" style="font-family: Inter;">
              ¡Mensaje enviado!
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs" style="font-family: Inter;">
              Nos pondremos en contacto contigo en las próximas 24 horas.
            </p>
            <button
              @click="closeModal"
              class="px-6 py-2.5 bg-gradient-to-r from-[#8E2DFE] to-[#E61655] text-white text-sm font-medium rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
              style="font-family: Inter;"
            >
              Cerrar
            </button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-2">
            <!-- Honeypot (anti-spam) -->
            <input type="hidden" name="bot-field" />

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Nombre -->
              <div>
                <label class="block text-sm font-medium tracking-tighter text-gray-400 pb-2">Nombre</label>
                <input
                  v-model="formData.nombre"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  class="w-full bg-transparent text-md font-bold leading-[19px] tracking-tighter text-gray-700 border-0 border-b-[0.5px] border-black focus:outline-none focus:border-coolPink pb-2 placeholder:font-normal placeholder:text-gray-300"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium tracking-tighter text-gray-400 pb-2">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="tu@email.com"
                  class="w-full bg-transparent text-md font-bold leading-[19px] tracking-tighter text-gray-700 border-0 border-b-[0.5px] border-black focus:outline-none focus:border-coolPink pb-2 placeholder:font-normal placeholder:text-gray-300"
                />
              </div>
            </div>

            <!-- Asunto -->
            <div class="py-7">
              <label class="block text-sm font-medium tracking-tighter text-gray-400 pb-2">Asunto</label>
              <input
                v-model="formData.asunto"
                type="text"
                required
                placeholder="¿En qué podemos ayudarte?"
                class="w-full bg-transparent text-md font-bold leading-[19px] tracking-tighter text-gray-700 border-0 border-b-[0.5px] border-black focus:outline-none focus:border-coolPink pb-2 placeholder:font-normal placeholder:text-gray-300"
              />
            </div>

            <!-- Mensaje -->
            <div>
              <label class="block text-sm font-medium tracking-tighter text-gray-400 pb-2">Mensaje</label>
              <textarea
                v-model="formData.mensaje"
                rows="3"
                required
                placeholder="Cuéntanos sobre tu proyecto..."
                class="w-full bg-transparent text-md font-bold leading-[19px] tracking-tighter text-gray-700 border-0 border-b-[0.5px] border-black focus:outline-none focus:border-coolPink pb-2 resize-none placeholder:font-normal placeholder:text-gray-300"
              ></textarea>
            </div>

            <!-- Error message -->
            <p v-if="error" class="text-red-500 text-xs pt-2" style="font-family: Inter;">
              Algo salió mal. Por favor, inténtalo de nuevo o escríbenos directamente a contacto@bestiari.es
            </p>

            <!-- Submit -->
            <div class="flex flex-col items-center justify-between gap-4 lg:flex-row mt-10">
              <button
                type="submit"
                :disabled="submitting"
                class="bg-gradient-to-r from-coolPurple to-coolPink cursor-pointer text-white font-medium leading-tight tracking-tighter px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {{ submitting ? 'Enviando...' : 'ENVIAR MENSAJE →' }}
              </button>
              <div class="flex justify-center items-center">
                <LogoBestiari class="h-10 w-auto opacity-20" />
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus,
textarea:focus {
  border-bottom-color: #E61655;
}
textarea {
  resize: none;
}
</style>
