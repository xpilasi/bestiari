import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView/AboutView.vue'
import ProjectsView from '@/views/ProjectsView/ProjectsView.vue'
import ServicesView from '@/views/ServicesView/ServicesView.vue'
import ContactView from '@/views/ContactView/ContactView.vue'
import { isAdminLoggedIn } from '@/lib/auth'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/nosotros', name: 'AboutView', component: AboutView },
  { path: '/proyectos', name: 'ProjectsView', component: ProjectsView },
  { path: '/servicios', name: 'ServicesView', component: ServicesView },
  { path: '/contacto', name: 'ContactView', component: ContactView },

  // Blog público
  { path: '/blog', name: 'Blog', component: () => import('@/views/BlogView.vue') },
  { path: '/blog/:slug', name: 'BlogPost', component: () => import('@/views/blog/BlogPostView.vue') },

  // Aprobación de posts por email
  { path: '/api/approve', name: 'ApprovePost', component: () => import('@/views/ApproveView.vue') },

  // Admin
  { path: '/admin/login', name: 'AdminLogin', component: () => import('@/views/admin/AdminLoginView.vue') },
  {
    path: '/admin/blog',
    name: 'AdminBlog',
    component: () => import('@/views/admin/blog/AdminBlogView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAdminLoggedIn()) {
    next('/admin/login')
  } else {
    next()
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
