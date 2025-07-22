<script>
export default {
  name: 'SectionSubTitle',
  props: {
    subtitle: {
      type: String,
      required: true
    },
    alignment: {
      type: String,
      default: 'left',
      validator: function (value) {
        return ['left', 'center', 'right'].includes(value)
      }
    },
    subtitleSize: {
      type: String,
      default: 'text-base lg:text-xl'
    },
    subtitleColor: {
      type: String,
      default: 'text-gray-600'
    },
    fontWeight: {
      type: String,
      default: 'font-extralight'
    },
    maxWidth: {
      type: String,
      default: 'max-w-3xl'
    },
    lineHeight: {
      type: String,
      default: '!leading-[25px]'
    },
    customLineHeight: {
      type: String,
      default: '3.2em'
    }
  },
  computed: {
    containerClasses() {
      const alignmentMap = {
        'left': 'justify-start',
        'center': 'justify-center',
        'right': 'justify-end'
      };
      return `flex items-center ${alignmentMap[this.alignment]}`;
    },
    subtitleClasses() {
      const alignmentMap = {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right'
      };
      const baseClasses = `${this.subtitleSize} ${this.subtitleColor} ${this.fontWeight} ${this.lineHeight} tracking-tight ${alignmentMap[this.alignment]}`;
      return this.maxWidth ? `${baseClasses} ${this.maxWidth}` : baseClasses;
    },
    subtitleStyle() {
      return {
        fontFamily: 'Inter',
        letterSpacing: '-6%',
        lineHeight: this.customLineHeight
      };
    }
  }
}
</script>

<template>
  <div :class="containerClasses">
    <p :class="subtitleClasses"
       :style="subtitleStyle">
      {{ subtitle }}
    </p>
  </div>
</template> 