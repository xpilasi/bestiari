<template>
  <div class="min-h-screen bg-bg-primary">
    <AdminBreadcrumb />
    <div class="px-4 lg:px-48 2xl:px-80 py-16">
      <h1 class="text-4xl font-bold text-gray-900 tracking-[-0.06em] mb-2" style="font-family: Inter;">Blog</h1>
      <p class="text-gray-500 mb-12">Automatización, inteligencia artificial y transformación digital para empresas que quieren escalar.</p>

      <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="n in 6" :key="n" class="bg-gray-800 rounded-2xl h-[340px] animate-pulse" />
      </div>

      <div v-else-if="store.posts.length === 0" class="text-center py-24 text-gray-500">
        Todavía no hay artículos publicados.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BlogCard v-for="post in store.posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogCard from '@/components/blog/BlogCard.vue'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb.vue'

const store = useBlogStore()
onMounted(() => store.fetchPublishedPosts())
</script>
