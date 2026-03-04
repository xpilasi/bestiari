<script>
import BestiariLogo from '@/assets/img/logos/logo-degradado.svg?component'
import logoDegradadoUrl from '@/assets/img/logos/logo-degradado.svg?url'
import BestiariLogoWhite from '@/assets/img/logos/logo-bestiari-dark.svg?component'
import { RouterLink } from 'vue-router'
import { Video, Mail, Send, House, Users, Layers, FolderOpen } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    BestiariLogo,
    BestiariLogoWhite,
    RouterLink,
    Video,
    Mail,
    Send,
    House,
    Users,
    Layers,
    FolderOpen
  },
  data() {
    return {
      logoDegradadoUrl,
      menuColumns: [
        {
          title: 'Menu',
          isButtons: true,
          items: [
            { name: 'Inicio', to: '/', icon: 'House' },
            { name: 'Nosotros', to: '/nosotros', icon: 'Users' },
            { name: 'Servicios', to: '/servicios', icon: 'Layers' },
            { name: 'Proyectos', to: '/proyectos', icon: 'FolderOpen' }
          ]
        },
        {
          title: 'Contáctanos',
          isButtons: true,
          items: [
            { name: 'Agendar llamado', href: 'https://calendly.com/bestiariagencia/30min', external: true, icon: 'Video' },
            { name: 'Enviar Email', href: 'mailto:contacto@bestiari.es', external: true, icon: 'Mail' },
            { name: 'Enviar formulario', to: '/contacto', icon: 'Send' }
          ]
        }
      ]
    }
  },
  methods: {
    scrollToTop(event, to) {
      if (this.$route.path === to) {
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>

<template>
  <footer class="bg-black text-white relative w-full overflow-hidden">
    <div class="mx-auto px-4 lg:px-48 2xl:px-80 py-8 md:py-12 xl:py-16">

      <!-- Layout Desktop (lg y superior) -->
      <div class="hidden lg:grid grid-cols-12 gap-8">
        <!-- Logo y texto de negocio -->
        <div class="col-span-6 space-y-6">
          <div class="mb-8">
            <BestiariLogo class="h-14 w-auto block" />
          </div>

          <div class="space-y-6">
            <h2 class="text-white font-semibold text-4xl leading-tight tracking-tight">
              Work Smarter,<br>
              Not Harder
            </h2>

            <p class="text-white font-medium text-sm leading-relaxed tracking-tight max-w-xs">
              Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.
            </p>
          </div>
        </div>

        <!-- Menús de navegación Desktop -->
        <div class="col-span-6">
          <div class="grid grid-cols-2 gap-12">
            <template v-for="column in menuColumns" :key="column.title">
              <div class="space-y-4">
                <h3 class="text-white font-semibold text-sm tracking-tight">
                  {{ column.title }}
                </h3>

                <!-- Columna con botones (Contáctanos) -->
                <nav v-if="column.isButtons" class="space-y-2.5">
                  <template v-for="item in column.items" :key="item.name">
                    <a
                      v-if="item.external"
                      :href="item.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="contact-btn group flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg border border-transparent text-gray-300 text-sm font-medium tracking-tight hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <component :is="item.icon" class="w-4 h-4 shrink-0 text-gray-500 group-hover:text-white transition-colors duration-200" />
                      {{ item.name }}
                    </a>
                    <RouterLink
                      v-else
                      :to="item.to"
                      class="contact-btn group flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg border border-transparent text-gray-300 text-sm font-medium tracking-tight hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                      @click="scrollToTop($event, item.to)"
                    >
                      <component :is="item.icon" class="w-4 h-4 shrink-0 text-gray-500 group-hover:text-white transition-colors duration-200" />
                      {{ item.name }}
                    </RouterLink>
                  </template>
                </nav>

                <!-- Columna de links normales (Menu) -->
                <nav v-else class="space-y-3">
                  <template v-for="item in column.items" :key="item.name">
                    <RouterLink
                      :to="item.to"
                      class="block text-gray-400 font-light text-sm tracking-tight hover:text-white transition-colors duration-200"
                      @click="scrollToTop($event, item.to)"
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
        <div class="absolute bottom-8 right-8 opacity-30">
          <BestiariLogoWhite class="h-48 text-gray-800 fill-gray-800" />
        </div>
      </div>

      <!-- Copyright Desktop -->
      <div class="hidden lg:flex justify-start mt-8 pt-6 border-t border-gray-800">
        <p class="text-gray-400 font-light text-sm tracking-tight">
          © 2026 Bestiari
        </p>
      </div>

      <!-- Layout Mobile/Tablet (lg y menor) -->
      <div class="lg:hidden space-y-8">

        <!-- Header Section Mobile -->
        <div class="text-center md:text-left space-y-6">
          <div class="flex justify-center md:justify-start">
            <img :src="logoDegradadoUrl" class="h-12 md:h-14 w-auto block" alt="Bestiari" />
          </div>

          <h2 class="text-white font-semibold text-2xl md:text-3xl leading-tight tracking-tight">
            Work Smarter,<br>
            Not Harder
          </h2>

          <p class="text-white font-medium text-base md:text-sm leading-relaxed tracking-tight max-w-md mx-auto md:mx-0">
            Desarrollamos aplicaciones y sitios web a medida para negocios que buscan mejorar su servicio, optimizar procesos o consolidar su presencia digital.
          </p>
        </div>

        <!-- Navigation Sections Mobile/Tablet -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

          <!-- Menu column -->
          <div class="space-y-4">
            <h3 class="text-white font-semibold text-base md:text-sm tracking-tight border-b border-gray-700 pb-2">
              {{ menuColumns[0].title }}
            </h3>

            <!-- Mobile: links simples -->
            <nav class="md:hidden grid grid-cols-2 gap-3">
              <RouterLink
                v-for="item in menuColumns[0].items"
                :key="item.name"
                :to="item.to"
                class="block text-gray-400 font-light text-base tracking-tight hover:text-white transition-colors duration-200 py-1"
                @click="scrollToTop($event, item.to)"
              >
                {{ item.name }}
              </RouterLink>
            </nav>

            <!-- Tablet: botones atractivos -->
            <nav class="hidden md:flex flex-col gap-2.5">
              <RouterLink
                v-for="item in menuColumns[0].items"
                :key="item.name"
                :to="item.to"
                class="contact-btn group flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg border border-transparent text-gray-300 text-sm font-medium tracking-tight hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                @click="scrollToTop($event, item.to)"
              >
                <component :is="item.icon" class="w-4 h-4 shrink-0 text-gray-500 group-hover:text-white transition-colors duration-200" />
                {{ item.name }}
              </RouterLink>
            </nav>
          </div>

          <!-- Contáctanos column -->
          <div class="space-y-4">
            <h3 class="text-white font-semibold text-base md:text-sm tracking-tight border-b border-gray-700 pb-2">
              {{ menuColumns[1].title }}
            </h3>

            <!-- Mobile: links simples -->
            <nav class="md:hidden grid grid-cols-2 gap-3">
              <template v-for="item in menuColumns[1].items" :key="item.name">
                <a
                  v-if="item.external"
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-gray-400 font-light text-base tracking-tight hover:text-white transition-colors duration-200 py-1"
                >
                  {{ item.name }}
                </a>
                <RouterLink
                  v-else
                  :to="item.to"
                  class="block text-gray-400 font-light text-base tracking-tight hover:text-white transition-colors duration-200 py-1"
                  @click="scrollToTop($event, item.to)"
                >
                  {{ item.name }}
                </RouterLink>
              </template>
            </nav>

            <!-- Tablet: botones atractivos -->
            <nav class="hidden md:flex flex-col gap-2.5">
              <template v-for="item in menuColumns[1].items" :key="item.name">
                <a
                  v-if="item.external"
                  :href="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-btn group flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg border border-transparent text-gray-300 text-sm font-medium tracking-tight hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <component :is="item.icon" class="w-4 h-4 shrink-0 text-gray-500 group-hover:text-white transition-colors duration-200" />
                  {{ item.name }}
                </a>
                <RouterLink
                  v-else
                  :to="item.to"
                  class="contact-btn group flex items-center gap-2.5 w-full px-4 py-2.5 rounded-lg border border-transparent text-gray-300 text-sm font-medium tracking-tight hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                  @click="scrollToTop($event, item.to)"
                >
                  <component :is="item.icon" class="w-4 h-4 shrink-0 text-gray-500 group-hover:text-white transition-colors duration-200" />
                  {{ item.name }}
                </RouterLink>
              </template>
            </nav>
          </div>

        </div>

        <!-- Footer info mobile -->
        <div class="pt-6 border-t border-gray-800 flex justify-end">
          <p class="text-gray-400 font-light text-sm tracking-tight">
            © 2026 Bestiari
          </p>

          <div class="hidden md:block absolute bottom-4 right-4 opacity-20">
            <BestiariLogoWhite class="h-20 text-gray-800 fill-gray-800" />
          </div>
        </div>

      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer-text {
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.06em;
}

.contact-btn :deep(svg) {
  fill: none;
}

.logo-white :deep(path) {
  fill: white;
}
</style>
