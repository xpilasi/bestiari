import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView/AboutView.vue'
import ProjectsView from '@/views/ProjectsView/ProjectsView.vue'
import ServicesView from '@/views/ServicesView/ServicesView.vue' 
import ContactView from '@/views/ContactView/ContactView.vue'

// Crear las rutas para toda la navegación
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
   
  },
  {
    path: '/nosotros',
    name: 'AboutView',
    component: AboutView,

  },
  {
    path: '/proyectos',
    name: 'ProjectsView',
    component: ProjectsView,
  },
  {
    path: '/servicios',
    name: 'ServicesView',
    component: ServicesView,
  },
  {
    path: '/contacto',
    name: 'ContactView',
    component: ContactView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
