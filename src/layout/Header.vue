<script>
import BestiariLogo from '@/assets/logos/logo-bestiari-dark.svg?component'
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
          name: 'Contacto', 
          to: '/contacto', 
          isSpecial: true
        }
      ]
    }
  }
}
</script>

<template>
  <header class="w-full h-20  flex flex-row items-center justify-between bg-bg-primary px-4  xl:px-48 ">
    <!-- Logo Section -->
    <RouterLink to="/" class="flex flex-col justify-center">
    <BestiariLogo class="h-10"  />
</RouterLink>
    

    <!-- Navigation Links -->
    <nav class="flex flex-row gap-14 text-md  items-center">
      <template v-for="item in navigation" :key="item.name">

          
        <RouterLink :to="item.to">
            <button
              @click="$router.push(item.to)"
              :class="item.isSpecial ? ' cursor-pointer text-white  font-medium text-md tracking-tighter  bg-gradient-to-r from-[#002BFF] to-[#FF6EFF] rounded-lg  py-1 px-4  flex items-center justify-center  group hover:shadow-lg transition-all duration-200 ' : ' py-4 w-20 cursor-pointer flex items-center justify-center font-medium text-md tracking-tighter transition-colors duration-200 ' "
            >
              {{ item.name }}
            </button>
          </RouterLink>
      
      </template>
    </nav>
  </header>
</template>
