<script>
export default {
  name: 'TeamCard',
  props: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    gradientFrom: {
      type: String,
      default: 'from-purple-500'
    },
    gradientVia: {
      type: String,
      default: 'via-pink-500'
    },
    gradientTo: {
      type: String,
      default: 'to-orange-400'
    },
    cardWidth: {
      type: String,
      default: 'w-80'
    },
    cardHeight: {
      type: String,
      default: 'h-96'
    }
  },
  computed: {
    backgroundGradient() {
      return `bg-gradient-to-br ${this.gradientFrom} ${this.gradientVia} ${this.gradientTo}`
    }
  }
}
</script>

<template>
  <div :class="`${cardWidth} ${cardHeight} rounded-3xl overflow-hidden shadow-2xl relative`">
    
    <!-- Background Gradient -->
    <div class="absolute inset-0" :class="backgroundGradient"></div>
    
    <!-- Card Content -->
    <div class="relative h-full flex flex-col">
      
      <!-- Photo Section -->
      <div class="flex-1 flex items-center justify-center pt-8 px-8">
        <div class="relative">
          <img :src="image" 
               :alt="name"
               class="w-48 h-48 object-cover rounded-full border-4 border-white/20 shadow-xl">
        </div>
      </div>
      
      <!-- Info Section -->
      <div class="bg-white rounded-t-3xl p-6 mt-4">
        <div class="text-center space-y-2">
          <!-- Name -->
          <h3 class="text-2xl font-normal text-gray-900 tracking-tight"
              style="font-family: Inter;">
            {{ name }}
          </h3>
          
          <!-- Role -->
          <p class="text-gray-600 font-light text-lg leading-relaxed"
             style="font-family: Inter;">
            {{ role }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Decorative Elements -->
    <div class="absolute top-6 right-6 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
    <div class="absolute top-12 left-8 w-2 h-2 bg-white/40 rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
    <div class="absolute bottom-32 right-8 w-4 h-4 bg-white/20 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
  </div>
</template>

<style scoped>
/* Custom animations for decorative elements */
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
</style>
