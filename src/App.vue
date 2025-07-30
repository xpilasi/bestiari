<script>
import Layout from '@/layout/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  },
  data() {
    return {
      isLoading: true,
      loadingPercentage: 0,
      loadingInterval: null
    }
  },
  mounted() {
    this.startLoading()
  },
  methods: {
    startLoading() {
      // Simular carga progresiva
      this.loadingInterval = setInterval(() => {
        if (this.loadingPercentage < 100) {
          // Incremento variable para simular carga real
          const increment = Math.random() * 8 + 2; // Entre 2 y 10
          this.loadingPercentage = Math.min(100, this.loadingPercentage + increment)
        } else {
          // Cuando llega a 100%, esperar un momento y ocultar
          clearInterval(this.loadingInterval)
          setTimeout(() => {
            this.isLoading = false
          }, 500) // Espera medio segundo en 100%
        }
      }, 40) // Actualizar cada 100ms
    }
  },
  beforeUnmount() {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>

<template>
  <!-- Loading Screen -->
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <div class="text-center">
      
      <!-- Logo o Título -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
          <!-- <span class="bg-gradient-to-r from-[#8E2DFE] to-[#E61655] bg-clip-text text-transparent">
            Bestiari
          </span> -->
        </h1>
        <!-- <p class="text-gray-300 text-lg">Cargando experiencia...</p> -->
      </div>

      <!-- Contador de Porcentaje -->
      <div class="mb-8">
        <div class="text-6xl md:text-8xl font-extralight text-black font-instrument-serif mb-4 italic">
          {{ Math.floor(loadingPercentage) }}%
        </div>
      </div>

      <!-- Barra de Progreso -->
      <div class="w-80 md:w-96 mx-auto">
        <div class="bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-[#8E2DFE] to-[#E61655] h-full rounded-full transition-all duration-300 ease-out"
            :style="{ width: loadingPercentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- Animación de puntos -->
      <!-- <div class="mt-8 flex justify-center space-x-2">
        <div class="w-3 h-3 bg-[#8E2DFE] rounded-full animate-bounce"></div>
        <div class="w-3 h-3 bg-[#E61655] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-3 h-3 bg-[#FFD93B] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div> -->

    </div>
  </div>

  <!-- Aplicación Principal -->
  <div v-else class="fade-in">
    <Layout />
  </div>

</template>
<style scoped>
/* Animación de entrada para la aplicación */
.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación personalizada para los puntos */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -10px, 0);
  }
  70% {
    transform: translate3d(0, -5px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

/* Optimización para dispositivos móviles */
@media (max-width: 768px) {
  .fade-in {
    animation-duration: 0.8s;
  }
}
</style>  