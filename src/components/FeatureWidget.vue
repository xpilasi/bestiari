<script>
export default {
  name: 'FeatureWidget',
  props: {
    number: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    numberColor: {
      type: String,
      default: 'text-[#E61655]'
    },
    titleColor: {
      type: String,
      default: 'text-[#3D3D3D]'
    },
    subtitleColor: {
      type: String,
      default: 'text-black'
    },
    numberSize: {
      type: String,
      default: 'text-2xl'
    },
    titleSize: {
      type: String,
      default: 'text-base'
    },
    subtitleSize: {
      type: String,
      default: 'text-xs'
    },
    maxWidth: {
      type: String,
      default: 'max-w-40'
    },
    spacing: {
      type: String,
      default: 'space-y-4'
    }
  }
}
</script>

<template>
  <div :class="spacing">
    <!-- Feature Number -->
    <div :class="`${numberColor} ${numberSize} font-normal leading-none tracking-[2px] font-instrument-serif italic`" 
         >
      {{ number }}
    </div>
    
    <!-- Feature Title -->
    <h3 :class="`${titleColor} ${titleSize} font-semibold leading-tight tracking-[-0.06em]`"
        style="font-family: Inter;">
      {{ title }}
    </h3>
    
    <!-- Feature Subtitle -->
    <p :class="`${subtitleColor} ${subtitleSize} font-extralight leading-relaxed tracking-[-0.06em] ${maxWidth}`"
       style="font-family: Inter;">
      {{ subtitle }}
    </p>
  </div>
</template>

<style scoped>
/* Ensure fonts are available */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600&display=swap');
</style> 