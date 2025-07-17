<script>
import BestiariLogo from '@/assets/img/logos/logo-bestiari-dark.svg?component'
import { RouterLink } from 'vue-router'

export default {
  name: 'Header',
  components: {
    BestiariLogo,
    RouterLink
  },
  data() {
    return {
      navigation: [
        { 
          name: 'Inicio', 
          to: '/', 
          isSpecial: false
         
        },
        { 
          name: 'Nosotros', 
          to: '/nosotros', 
          isSpecial: false
        },
        { 
          name: 'Proyectos', 
          to: '/proyectos', 
          isSpecial: false
        },
        { 
          name: 'Servicios', 
          to: '/servicios', 
          isSpecial: false
        },
        { 
          name: 'Contacto →', 
          to: '/contacto', 
          isSpecial: true
        }
      ],
      linePosition: {
        left: 0,
        width: 0,
        opacity: 0
      },
      isMobileMenuOpen: false
    }
  },
  computed: {
    activeIndex() {
      return this.navigation.findIndex(item => item.to === this.$route.path && !item.isSpecial)
    }
  },
  watch: {
    $route: {
      handler() {
        this.$nextTick(() => {
          // Dar un poco más de tiempo para que el DOM esté listo
          setTimeout(() => {
            this.updateLinePosition()
          }, 50)
        })
        // Cerrar menú mobile al cambiar de ruta
        this.closeMobileMenu()
      },
      immediate: true
    }
  },
  methods: {
    updateLinePosition(retryCount = 0) {
      const activeIndex = this.activeIndex
      console.log('Updating line position. Active index:', activeIndex, 'Current route:', this.$route.path, 'Retry:', retryCount)
      
      if (activeIndex >= 0) {
        // Buscar el botón activo usando querySelector
        const navContainer = this.$refs.navContainer
        if (!navContainer) {
          console.log('Nav container not found, retry:', retryCount)
          // Reintentar hasta 3 veces
          if (retryCount < 3) {
            setTimeout(() => {
              this.updateLinePosition(retryCount + 1)
            }, 100)
          }
          return
        }
        
        const buttons = navContainer.querySelectorAll('button')
        const activeButton = buttons[activeIndex]
        
        console.log('Found buttons:', buttons.length, 'Active button:', activeButton)
        
        if (activeButton && navContainer) {
          const buttonRect = activeButton.getBoundingClientRect()
          const containerRect = navContainer.getBoundingClientRect()
          
          const newPosition = {
            left: buttonRect.left - containerRect.left,
            width: buttonRect.width,
            opacity: 1
          }
          
          console.log('New line position:', newPosition)
          this.linePosition = newPosition
        }
      } else {
        console.log('No active index, hiding line')
        this.linePosition.opacity = 0
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      // Prevenir scroll del body cuando el menú está abierto
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
    handleMobileNavigation(route) {
      this.$router.push(route)
      this.closeMobileMenu()
    }
  },
  mounted() {
    // Asegurar que el DOM esté completamente listo
    this.$nextTick(() => {
      setTimeout(() => {
        this.updateLinePosition()
      }, 100)
    })
    window.addEventListener('resize', this.updateLinePosition)
  },
  unmounted() {
    window.removeEventListener('resize', this.updateLinePosition)
    // Limpiar el overflow del body al desmontar el componente
    document.body.style.overflow = ''
  }
}
</script>

<template>
  <!-- Header Desktop (xl y superior) -->
  <header class="hidden xl:flex w-full h-20 flex-row items-center justify-between bg-bg-primary px-4 xl:px-48 2xl:px-80">
    <!-- Logo Section -->
    <RouterLink to="/" class="flex flex-col justify-center">
      <BestiariLogo class="h-10" />
    </RouterLink>
    
    <!-- Navigation Links Desktop -->
    <nav ref="navContainer" class="flex flex-row gap-14 text-md items-center relative">
      <template v-for="(item, index) in navigation" :key="item.name">
        <RouterLink :to="item.to">
          <button
            @click="$router.push(item.to)"
            :class="item.isSpecial ? ' cursor-pointer text-white  font-light text-md tracking-tighter  bg-gradient-to-r from-[#002BFF] to-[#FF6EFF] hover:scale-105 rounded-2xl py-1 px-4  flex items-center justify-center  group hover:shadow-lg transition-all duration-300 ' : ' py-4 w-20 cursor-pointer flex items-center justify-center font-normal text-md tracking-tighter transition-colors duration-200 relative group ' "
          >
            {{ item.name }}
          </button>
        </RouterLink>
      </template>
      
      <!-- Línea deslizante para ruta activa -->
      <div 
        class="absolute bottom-0 h-0.5 bg-black transition-all duration-500 ease-out z-10 pointer-events-none"
        :style="{
          left: linePosition.left + 'px',
          width: linePosition.width + 'px',
          opacity: linePosition.opacity
        }"
      ></div>
    </nav>
  </header>

  <!-- Header Mobile/Tablet (xl y menor) -->
  <header class="xl:hidden w-full h-16 flex items-center justify-between bg-bg-primary px-4 relative z-50">
    <!-- Logo Section Mobile -->
    <RouterLink to="/" class="flex items-center" @click="closeMobileMenu">
      <BestiariLogo class="h-8" />
    </RouterLink>
    
    <!-- Hamburger Menu Button -->
    <button 
      @click="toggleMobileMenu"
      class="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
      :class="{ 'open': isMobileMenuOpen }"
    >
      <span 
        class="block w-6 h-0.5 bg-black transition-all duration-300 transform origin-center"
        :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
      ></span>
      <span 
        class="block w-6 h-0.5 bg-black transition-all duration-300"
        :class="isMobileMenuOpen ? 'opacity-0' : ''"
      ></span>
      <span 
        class="block w-6 h-0.5 bg-black transition-all duration-300 transform origin-center"
        :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
      ></span>
    </button>
  </header>

  <!-- Mobile Menu Overlay -->
  <Transition name="mobile-menu">
    <div 
      v-if="isMobileMenuOpen"
      class="xl:hidden fixed inset-0 bg-white z-40 overflow-y-auto"
    >
      <!-- Mobile Menu Content -->
      <div class="flex flex-col h-full pt-20 pb-8">
        <!-- Navigation Links Mobile -->
        <nav class="flex flex-col justify-between items-center px-6 space-y-1">
          <template v-for="item in navigation" :key="`mobile-${item.name}`">
            <button
              @click="handleMobileNavigation(item.to)"
              :class="[
                'w-full  py-4 px-4 rounded-4xl text-lg font-medium transition-all duration-200',
                item.isSpecial 
                  ? 'bg-gradient-to-r mt-10 mb-30 w-1/3 from-[#002BFF] to-[#FF6EFF] text-white text-center shadow-lg' 
                  : $route.path === item.to 
                    ? ' text-black font-semibold text-left' 
                    : 'text-gray-700  hover:text-black text-left'
              ]"
            >
              {{ item.name }}
            </button>
          </template>
        </nav>

        <!-- Footer info in mobile menu -->
        <div class="px-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-500 text-center">
            Bestiari © 2025
          </p>
        </div>
      </div>

      <!-- Close overlay cuando se hace click fuera del contenido -->
      <div 
        @click="closeMobileMenu"
        class="absolute inset-0 -z-10"
      ></div>
    </div>
  </Transition>
</template>

<style scoped>
/* Transiciones para el menú mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Animación para las barras del hamburger */
.hamburger-line {
  transition: all 0.3s ease-in-out;
}

/* Asegurar que el overlay tenga el z-index correcto */
.mobile-menu-overlay {
  backdrop-filter: blur(4px);
}
</style>
