<template>
  <div class="min-h-screen bg-bg-primary">
    <AdminBreadcrumb />
    <div class="px-4 lg:px-48 2xl:px-80 py-16">
      <h1 class="text-4xl font-bold text-gray-900 tracking-[-0.06em] mb-2" style="font-family: Inter;">Blog</h1>
      <p class="text-gray-500 mb-12">Automatización, inteligencia artificial y transformación digital para empresas que quieren escalar.</p>

      <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="n in perPage" :key="n" class="bg-gray-800 rounded-2xl h-[340px] animate-pulse" />
      </div>

      <div v-else-if="store.posts.length === 0" class="text-center py-24 text-gray-500">
        Todavía no hay artículos publicados.
      </div>

      <template v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <BlogCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
        </div>

        <nav v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-12" aria-label="Paginación del blog">
          <button
            class="group px-4 py-2 rounded-full text-sm font-medium text-gray-600 cursor-pointer transition-all duration-200 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <span class="inline-block transition-transform duration-200 group-hover:-translate-x-0.5 group-disabled:translate-x-0">←</span> Anterior
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="w-10 h-10 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200"
            :class="page === currentPage
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-pink-500/30 scale-105'
              : 'text-gray-600 bg-transparent hover:text-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-sm hover:-translate-y-0.5'"
            :aria-current="page === currentPage ? 'page' : undefined"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            class="group px-4 py-2 rounded-full text-sm font-medium text-gray-600 cursor-pointer transition-all duration-200 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Siguiente <span class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-disabled:translate-x-0">→</span>
          </button>
        </nav>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/blog/BlogCard.vue'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb.vue'

const store = useBlogStore()

const perPage = 6
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(store.posts.length / perPage)))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return store.posts.slice(start, start + perPage)
})

function goToPage(page) {
  const target = Math.min(Math.max(page, 1), totalPages.value)
  if (target === currentPage.value) return
  currentPage.value = target
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Si la lista cambia y la página actual queda fuera de rango, la corregimos.
watch(totalPages, (max) => {
  if (currentPage.value > max) currentPage.value = max
})

onMounted(() => store.fetchPublishedPosts())
</script>
