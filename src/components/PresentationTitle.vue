<script>
export default {
  name: 'PresentationTitle',
  props: {
    text: {
      type: String,
      required: true
    },
    highlightedWords: {
      type: Array,
      default: () => []
    },
    maxWidth: {
      type: String,
      default: 'max-w-4xl 2xl:max-w-6xl'
    },
    textSize: {
      type: String,
      default: 'text-4xl lg:text-5xl'
    },
    fontWeight: {
      type: String,
      default: 'font-normal'
    },
    tracking: {
      type: String,
      default: 'tracking-tighter'
    },
    margin: {
      type: String,
      default: 'mb-6'
    },
    textColor: {
      type: String,
      default: 'text-black'
    },
    padding: {
      type: String,
      default: 'px-4 xl:px-48 2xl:px-80'
    }
  },
  computed: {
    processedText() {
      if (!this.highlightedWords || this.highlightedWords.length === 0) return this.text;
      
      let processedText = this.text;
      
      // Procesar cada palabra destacada
      this.highlightedWords.forEach(word => {
        // Regex que maneja tildes y acentos correctamente
        const regex = new RegExp(`(^|\\s)(${word})(\\s|$|[.,!?;:])`, 'gi');
        processedText = processedText.replace(regex, (match, before, word, after) => {
          return `${before}<span class="italic font-light ${this.textSize} highlighted-word" style="font-family: 'Instrument Serif', serif;">${word}</span>${after}`;
        });
      });
      
      return processedText;
    },
    containerClasses() {
      return `${this.maxWidth} flex items-center ${this.padding}`;
    },
    titleClasses() {
      return `${this.textColor} ${this.textSize} ${this.fontWeight} ${this.tracking} ${this.margin} max-w-3xl`;
    }
  }
}
</script>

<template>
  <div :class="containerClasses">
    <h2 :class="titleClasses"
        style="font-family: Inter;"
        v-html="processedText">
    </h2>
  </div>
</template>

<style scoped>
/* Estilo para las palabras destacadas - Solo gradiente */
.highlighted-word {
  background: linear-gradient(135deg, #8E2DFE 0%, #E61655 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}
</style>
