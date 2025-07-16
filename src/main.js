import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Crear las rutas para toda la navegación
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue').catch(() => {
      // Fallback component si no existe la vista
      return { template: '<div class="p-8 text-center">Bienvenido a Bestiari</div>' }
    })
  },
//   {
//     path: '/nosotros',
//     name: 'Nosotros',
//     component: () => import('./views/Nosotros.vue').catch(() => {
//       return { template: '<div class="p-8 text-center"><h1 class="text-2xl font-bold mb-4">Nosotros</h1><p>Información sobre nuestro equipo y empresa.</p></div>' }
//     })
//   },
//   {
//     path: '/proyectos',
//     name: 'Proyectos',
//     component: () => import('./views/Proyectos.vue').catch(() => {
//       return { template: '<div class="p-8 text-center"><h1 class="text-2xl font-bold mb-4">Proyectos</h1><p>Nuestro portafolio de trabajo.</p></div>' }
//     })
//   },
//   {
//     path: '/servicios',
//     name: 'Servicios',
//     component: () => import('./views/Servicios.vue').catch(() => {
//       return { template: '<div class="p-8 text-center"><h1 class="text-2xl font-bold mb-4">Servicios</h1><p>Los servicios que ofrecemos.</p></div>' }
//     })
//   },
//   {
//     path: '/contacto',
//     name: 'Contacto',
//     component: () => import('./views/Contacto.vue').catch(() => {
//       return { template: '<div class="p-8 text-center"><h1 class="text-2xl font-bold mb-4">Contacto</h1><p>Ponte en contacto con nosotros.</p></div>' }
//     })
//   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
