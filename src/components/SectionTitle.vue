<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    highlightedWord: {
      type: String,
      default: ''
    },
    alignment: {
      type: String,
      default: 'center',
      validator: function (value) {
        return ['left', 'center', 'right'].includes(value)
      }
    },
    titleSize: {
      type: String,
      default: 'text-4xl md:text-5xl'
    },
    titleColor: {
      type: String,
      default: 'text-black'
    },
    maxWidth: {
      type: String,
      default: 'max-w-4xl'
    }
  },
  computed: {
    processedTitle() {
      if (!this.highlightedWord) return this.title;
      
      // Regex que maneja tildes y acentos correctamente
      const regex = new RegExp(`(^|\\s)(${this.highlightedWord})(\\s|$|[.,!?;:])`, 'gi');
      return this.title.replace(regex, (match, before, word, after) => {
        return `${before}<span class="italic font-light tracking-tighter ${this.titleSize} highlighted-word" style="font-family: 'Instrument Serif', serif;">${word}</span>${after}`;
      });
    },
    containerClasses() {
      const alignmentMap = {
        'left': 'justify-start',
        'center': 'justify-center',
        'right': 'justify-end'
      };
      return `flex items-center ${alignmentMap[this.alignment]}`;
    },
    textClasses() {
      const alignmentMap = {
        'left': 'text-left',
        'center': 'text-center',
        'right': 'text-right'
      };
      return `${this.titleColor} font-normal ${this.titleSize} ${this.maxWidth} leading-[1.03em] tracking-[-0.06em] ${alignmentMap[this.alignment]}`;
    }
  }
}
</script>

<template>
  <div :class="containerClasses">
    <h1 :class="textClasses"
        style="font-family: Inter;"
        v-html="processedTitle">
    </h1>
  </div>
</template>

<style scoped>
/* Estilo para la palabra destacada - Solo gradiente */
.highlighted-word {
  background: linear-gradient(135deg, #8E2DFE 0%, #E61655 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}
</style> 