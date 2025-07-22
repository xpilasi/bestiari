<script>
export default {
  name: 'WhyUsCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    icons: {
      type: Array,
      default: () => []
    },
    bgImages: {
      type: Array,
      required: true
    },
    bgPositions: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="relative w-64 h-80 sm:w-72 sm:h-88 lg:w-50 lg:h-96 rounded-2xl overflow-hidden flex-shrink-0 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
    
    <!-- Background Images -->
    <div v-for="(bgImg, index) in bgImages" :key="index">
      <img :src="bgImg" 
           alt="Fluid background"
           class="absolute object-cover"
           :style="{
             top: bgPositions[index].top,
             left: bgPositions[index].left,
             width: bgPositions[index].width,
             height: bgPositions[index].height
           }">
    </div>
    
    <!-- Icon Container (positioned over background) -->
    <div class="absolute top-12 left-8 w-16 h-16 sm:top-14 sm:left-10 sm:w-18 sm:h-18 lg:top-15 lg:left-12 lg:w-20 lg:h-20">
      <!-- Single Icon -->
      <div v-if="icon" class="w-full h-full flex items-center justify-center">
        <img :src="icon" 
             :alt="title + ' icon'"
             class="max-w-full max-h-full object-contain">
      </div>
      
      <!-- Multiple Icons (for responsive design) -->
      <div v-else-if="icons.length > 0" 
           class="w-full h-full flex items-center justify-center relative">
        <img v-for="(iconSrc, index) in icons" 
             :key="index"
             :src="iconSrc" 
             :alt="title + ' icon ' + (index + 1)"
             class="absolute object-contain"
             :class="index === 0 ? 'top-0 left-0 max-h-6' : 'bottom-0 left-0 max-h-5'">
      </div>
    </div>
    
    <!-- White Container for Content -->
    <div class="absolute bottom-0 left-0 w-64 h-36 sm:w-72 sm:h-40 lg:w-50 lg:h-44 bg-white rounded-2xl flex flex-col justify-between p-3">
      
      <!-- Text Content -->
      <div class="flex-1 flex flex-col justify-start">
        <!-- Title -->
        <h3 class="text-black font-medium text-sm sm:text-md lg:text-md leading-tight tracking-[-0.06em] mb-1 sm:mb-2"
            style="font-family: Inter;">
          {{ title }}
        </h3>
        
        <!-- Subtitle -->
        <p class="text-gray-500 font-light text-xs sm:text-sm lg:text-sm tracking-tighter leading-tight"
           style="font-family: Inter;">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Card hover animations */
.card-container:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}
</style> 