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
    description: {
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
    circleSize: {
      type: String,
      default: 'w-64 h-64'
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
  <div class="flex flex-col items-center space-y-6 ">
    
    <!-- Circular Photo Card -->
    <div :class="`${circleSize} rounded-full  overflow-hidden shadow-2xl relative`">
      
      <!-- Background Gradient -->
      <div class="absolute inset-0" :class="backgroundGradient"></div>
      
      <!-- Photo -->
      <div class="relative h-full flex items-center justify-center">
        <img :src="image" 
             :alt="name"
             class="w-full h-full object-cover">
      </div>
      
    </div>
    
    <!-- Team Member Info -->
    <div class="text-start space-y-2 max-w-xs px-10">
      <!-- Name -->
      <h3 class="text-5xl italic font-light font-instrument-serif text-pink-600 "
          >
        {{ name }}
      </h3>
      
      <!-- Role -->
      <p class="text-black0 font-base leading-relaxed tracking-tight"
         style="font-family: Inter;">
        {{ role }}
      </p>
      <p class="text-gray-500 font-extralight text-start leading-tight   text-base tracking-tight"
         style="font-family: Inter;">
        {{ description }}
      </p>
    </div>
    
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
