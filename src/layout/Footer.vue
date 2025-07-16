<script>
import BestiariLogo from '@/assets/logos/logo-bestiari-dark.svg?component'
import { RouterLink } from 'vue-router'

export default {
  name: 'Footer',
  components: {
    BestiariLogo,
    RouterLink
  },
  data() {
    return {
      menuColumns: [
        {
          title: 'Menu',
          items: [
            { name: 'Inicio', to: '/' },
            { name: 'Nosotros', to: '/nosotros' },
            { name: 'Servicios', to: '/servicios' },
            { name: 'Proyectos', to: '/proyectos' }
          ]
        },
        {
          title: 'Navegación',
          items: [
            { name: 'Blog', to: '/blog' },
            { name: 'Contacto', to: '/contacto' },
            { name: 'Agendar llamado', to: '/agendar' },
            { name: 'Proyectos', to: '/proyectos' }
          ]
        },
        {
          title: 'Redes Sociales',
          items: [
            { name: 'LinkedIn', to: '#' },
            { name: 'Instagram', to: '#' },
            { name: 'Twitter', to: '#' },
            { name: 'GitHub', to: '#' }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <footer class="bg-black text-white relative w-full overflow-hidden">
    <div class="mx-auto px-4 xl:px-48 py-8 md:py-12 xl:py-16">
      
      <!-- Layout Desktop (lg y superior) -->
      <div class="hidden lg:grid grid-cols-12 gap-8">
        <!-- Logo y texto de negocio -->
        <div class="col-span-5 space-y-6">
          <!-- Logo principal (blanco) -->
          <div class="mb-8">
            <BestiariLogo class="h-12 text-white fill-white" />
          </div>
          
          <!-- Texto de negocio -->
          <div class="space-y-6">
            <h2 class="text-white font-semibold text-4xl leading-tight tracking-tight">
              Work Smarter,<br>
              Not Harder
            </h2>
            
            <p class="text-white font-medium text-sm leading-relaxed tracking-tight max-w-xs">
              Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.
            </p>
            
            <p class="text-gray-400 font-light text-sm tracking-tight">
              © 2025 Bestiari
            </p>
          </div>
        </div>

        <!-- Menús de navegación Desktop -->
        <div class="col-span-7">
          <div class="grid grid-cols-3 gap-12">
            <template v-for="column in menuColumns" :key="column.title">
              <div class="space-y-4">
                <!-- Título de la columna -->
                <h3 class="text-white font-semibold text-sm tracking-tight">
                  {{ column.title }}
                </h3>
                
                <!-- Enlaces de la columna -->
                <nav class="space-y-3">
                  <template v-for="item in column.items" :key="item.name">
                    <RouterLink 
                      :to="item.to"
                      class="block text-gray-400 font-light text-sm tracking-tight hover:text-white transition-colors duration-200"
                    >
                      {{ item.name }}
                    </RouterLink>
                  </template>
                </nav>
              </div>
            </template>
          </div>
        </div>

        <!-- Logo decorativo (gris oscuro) - Solo desktop -->
        <div class="absolute bottom-8 right-8 opacity-20">
          <BestiariLogo class="h-48 text-gray-800 fill-gray-800" />
        </div>
      </div>

      <!-- Layout Mobile/Tablet (lg y menor) -->
      <div class="lg:hidden space-y-8">
        
        <!-- Header Section Mobile -->
        <div class="text-center md:text-left space-y-6">
          <!-- Logo principal móvil -->
          <div class="flex justify-center md:justify-start">
            <BestiariLogo class="h-10 md:h-12 text-white fill-white" />
          </div>
          
          <!-- Título principal móvil -->
          <h2 class="text-white font-semibold text-2xl md:text-3xl leading-tight tracking-tight">
            Work Smarter,<br>
            Not Harder
          </h2>
          
          <!-- Descripción móvil -->
          <p class="text-white font-medium text-base md:text-sm leading-relaxed tracking-tight max-w-md mx-auto md:mx-0">
            Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.
          </p>
        </div>

        <!-- Navigation Sections Mobile/Tablet -->
        <div class="space-y-8 md:space-y-6">
          
          <!-- Mobile: Stack vertical, Tablet: 2 columnas, luego 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
            <!-- Primera columna - Menu -->
            <div class="space-y-4">
              <h3 class="text-white font-semibold text-base md:text-sm tracking-tight border-b border-gray-700 pb-2">
                {{ menuColumns[0].title }}
              </h3>
              <nav class="grid grid-cols-2 md:grid-cols-1 gap-3">
                <template v-for="item in menuColumns[0].items" :key="item.name">
                  <RouterLink 
                    :to="item.to"
                    class="block text-gray-400 font-light text-base md:text-sm tracking-tight hover:text-white transition-colors duration-200 py-1"
                  >
                    {{ item.name }}
                  </RouterLink>
                </template>
              </nav>
            </div>

            <!-- Segunda columna - Navegación -->
            <div class="space-y-4">
              <h3 class="text-white font-semibold text-base md:text-sm tracking-tight border-b border-gray-700 pb-2">
                {{ menuColumns[1].title }}
              </h3>
              <nav class="grid grid-cols-2 md:grid-cols-1 gap-3">
                <template v-for="item in menuColumns[1].items" :key="item.name">
                  <RouterLink 
                    :to="item.to"
                    class="block text-gray-400 font-light text-base md:text-sm tracking-tight hover:text-white transition-colors duration-200 py-1"
                  >
                    {{ item.name }}
                  </RouterLink>
                </template>
              </nav>
            </div>
          </div>

          <!-- Tercera sección - Redes Sociales (ancho completo) -->
          <div class="space-y-4">
            <h3 class="text-white font-semibold text-base md:text-sm tracking-tight border-b border-gray-700 pb-2">
              {{ menuColumns[2].title }}
            </h3>
            <nav class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <template v-for="item in menuColumns[2].items" :key="item.name">
                <RouterLink 
                  :to="item.to"
                  class="block text-gray-400 font-light text-base md:text-sm tracking-tight hover:text-white transition-colors duration-200 py-1 text-center md:text-left"
                >
                  {{ item.name }}
                </RouterLink>
              </template>
            </nav>
          </div>
        </div>

        <!-- Footer info mobile -->
        <div class="pt-6 border-t border-gray-800 text-center md:text-left">
          <p class="text-gray-400 font-light text-sm tracking-tight">
            © 2025 Bestiari
          </p>
          
          <!-- Logo decorativo pequeño para tablet -->
          <div class="hidden md:block absolute bottom-4 right-4 opacity-10">
            <BestiariLogo class="h-20 text-gray-800 fill-gray-800" />
          </div>
        </div>

      </div>
      
    </div>
  </footer>
</template>

<style scoped>
/* Asegurar que la fuente Inter se aplique correctamente */
.footer-text {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.06em;
}

/* Ajustes específicos para el logo */
:deep(svg) {
  fill: currentColor;
}
</style>
