<script>
export default {
  name: 'HomeHeroSection',
  data() {
    return {
      heroTitle: 'Tu web profesional empieza aquí',
      heroSubtitle: 'Haz crecer tu presencia digital y atrae más clientes.',
      highlightedWord: 'aquí', // Palabra que se va a destacar
      meetingTitle: 'Reserva una Meeting de 15 minutos',
      meetingSubtitle: 'Agenda ahora'
    }
  },
  computed: {
    processedTitle() {
      if (!this.highlightedWord) return this.heroTitle;
      
      // Regex que maneja tildes y acentos correctamente
      const regex = new RegExp(`(^|\\s)(${this.highlightedWord})(\\s|$|[.,!?;:])`, 'gi');
      return this.heroTitle.replace(regex, (match, before, word, after) => {
        return `${before}<span class="italic font-light text-5xl lg:text-[80px] highlighted-word" style="font-family: 'Instrument Serif', serif;">${word}</span>${after}`;
      });
    }
  },
  methods: {
    handleContactClick() {
      // Navegación a contacto
      console.log('Navegando a contacto...')
    },
    handleStartTodayClick() {
      // Acción para empezar hoy
      console.log('Empezando hoy...')
    },
    handleMeetingClick() {
      // Abrir calendario o enlace de reunión
      console.log('Agendando reunión...')
    }
  }
}
</script>

<template>
  <section class="min-h-screen bg-primary flex flex-col justify-start py-30 ">
    <div class="mx-auto w-full ">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        
        <!-- Hero Header - Lado Izquierdo -->
        <div class="flex flex-col  ">
                     <h1 class="text-4xl lg:text-7xl font-medium tracking-tighter leading-0.5 text-black  mb-6 max-w-3xl" 
               style="font-family: Inter; letter-spacing: -6%; line-height: 1em;"
               v-html="processedTitle">
           </h1>
                     <p class="text-base lg:text-xl text-gray-600 font-extralight leading-relaxed"
              style="font-family: Inter; letter-spacing: -6%; line-height: 3.2em;">
             {{ heroSubtitle }}
           </p>
        </div>

        <!-- Regular Card - Lado Derecho -->
        <div class="relative">
          <div class="w-64 h-80 xl:w-96 xl:h-120 bg-gray-300 rounded-2xl shadow-2xl overflow-hidden relative"
               style="box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.74);">
            
            <!-- Imagen de fondo fluida -->
            <img src="../assets/img/fluid-bg.png" 
                 alt="Fluid background"
                 class="absolute -top-56 -left-36 w-120 h-[900px] object-cover z-0">
            
            <!-- Imagen del caballo -->
            <img src="../assets/img/horse-cool.png" 
                 alt="Horse cool character"
                 class="absolute top-0 left-22 bottom-0 w-80 object-cover z-10 ">
            
            <!-- Gradiente azul inferior -->
            <div class="absolute bottom-0 left-0 right-0 h-56 z-20 bg-gradient-to-b from-transparent to-blue-500"></div>
            
            <!-- Botón Empieza hoy -->
            <button @click="handleStartTodayClick"
                    class="absolute top-5 left-6 bg-black rounded-full px-4 py-2 flex items-center gap-2 text-white text-xs font-normal z-30"
                    >
                    <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span class="py-1">Empieza hoy</span>
              
            </button>
            
            <!-- Botón Contáctanos -->
            <button @cick="handleContactClick"
                    class="absolute bottom-28 left-9  right-9 bg-white rounded-lg py-4  text-gray-700 font-semibold tracking-tighter text-2xl shadow-xl z-30"
                    >
              Contáctanos
            </button>
            
            <!-- Meeting Action Widget -->
            <div class="absolute justify-between flex-row bottom-8 left-9 right-9 flex items-center gap-3 z-30">
              <!-- Animal Avatar -->
              <div class="relative">
                <div class="w-10 h-10 bg-white rounded-full overflow-hidden relative">
                  <div class="absolute -top-1 left-0 w-9 h-11 "></div>
                  <img src="../assets/img/panda-avatar.png" 
                       alt="Panda avatar"
                       class="absolute   h-24 object-cover">
                </div>
              </div>
              
              <!-- Meeting Text -->
              <div class=" flex flex-col justify-start items-start gap-1 ">

                <span class="text-white font-semibold text-xs leading-tight ">{{ meetingTitle }}</span>
                <p class="text-gray-300 font-light text-xs ">{{ meetingSubtitle }}</p>

              </div>
              
              <!-- Arrow Button -->
              <button @click="handleMeetingClick"
                      class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img src="../assets/img/arrow-right.svg" 
                     alt="Arrow right"
                     class="w-6 h-6">
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilos adicionales específicos para ajustes finos */
.w-120 {
  width: 30rem;
}

.h-180 {
  height: 45rem;
}

.w-33 {
  width: 8.25rem;
}

.-top-56 {
  top: -14rem;
}

.-left-36 {
  left: -9rem;
}

/* Estilo para la palabra destacada - Solo gradiente */
.highlighted-word {
  background: linear-gradient(135deg, #8E2DFE 0%, #E61655 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}
</style>