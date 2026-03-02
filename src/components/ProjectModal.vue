<script>
export default {
  name: 'ProjectModal',
  props: {
    project: { type: Object, default: null },
    isOpen: { type: Boolean, default: false }
  },
  emits: ['close'],
  watch: {
    isOpen(val) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleKeydown(e) {
      if (e.key === 'Escape') this.close()
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
        @click.self="close"
      >
        <!-- Modal card -->
        <div class="modal-card relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row">

          <!-- Close button -->
          <button
            @click="close"
            class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/20 hover:bg-black/50 flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer"
            aria-label="Cerrar"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Image -->
          <div class="w-full md:w-[46%] h-56 sm:h-72 md:h-auto flex-shrink-0 relative overflow-hidden">
            <img
              :src="project.projectImage"
              :alt="project.projectName"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/5"></div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto flex flex-col justify-center px-7 py-8 sm:px-10 sm:py-10">

            <!-- Badge -->
            <span class="inline-flex self-start items-center px-3.5 py-1.5 bg-gradient-to-r from-[#8E2DFE] to-[#E61655] text-white text-[10px] font-bold rounded-full uppercase tracking-[0.14em] mb-5">
              {{ project.productType }}
            </span>

            <!-- Title -->
            <h2
              class="text-[2rem] md:text-[2.2rem] font-bold text-black leading-[1.1] tracking-[-0.04em] mb-4"
              style="font-family: Inter;"
            >
              {{ project.projectName }}
            </h2>

            <!-- Description -->
            <p
              class="text-[#767474] text-[0.95rem] leading-relaxed mb-7"
              style="font-family: Inter;"
            >
              {{ project.modalDescription }}
            </p>

            <!-- Divider -->
            <div class="w-12 h-px bg-gradient-to-r from-[#8E2DFE] to-[#E61655] mb-6 rounded-full"></div>

            <!-- Features -->
            <ul class="space-y-3">
              <li
                v-for="(feature, i) in project.modalFeatures"
                :key="i"
                class="flex items-center gap-3 text-sm text-[#3D3D3D]"
                style="font-family: Inter;"
              >
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#8E2DFE] to-[#E61655] flex items-center justify-center shadow-sm shadow-purple-300/40">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                {{ feature }}
              </li>
            </ul>


          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
/* Modal overlay fade */
.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Modal card slide-in */
.modal-fade-enter-active .modal-card {
  animation: modal-enter 0.38s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
}
.modal-fade-leave-active .modal-card {
  animation: modal-leave 0.2s ease forwards;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.90) translateY(28px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modal-leave {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.94) translateY(14px);
  }
}
</style>
