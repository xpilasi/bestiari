<template>
  <div class="min-h-screen bg-bg-primary">

    <!-- Skeleton -->
    <div v-if="loading" class="px-4 py-16 animate-pulse space-y-6 max-w-[72ch] mx-auto">
      <div class="h-4 bg-gray-300 rounded w-24" />
      <div class="h-10 bg-gray-300 rounded w-3/4" />
      <div class="h-4 bg-gray-200 rounded w-1/3" />
      <div class="w-full aspect-video bg-gray-300 rounded-2xl" />
      <div class="space-y-3">
        <div v-for="n in 10" :key="n" class="h-4 bg-gray-200 rounded" :class="n % 4 === 0 ? 'w-3/4' : 'w-full'" />
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!post" class="px-4 py-32 text-center">
      <p class="text-gray-500 mb-4" style="font-family: Inter;">Artículo no encontrado.</p>
      <router-link to="/blog" class="text-sm font-medium text-coolPurple hover:underline" style="font-family: Inter;">
        ← Volver al blog
      </router-link>
    </div>

    <!-- Article -->
    <article v-else class="px-4 py-14">
      <div class="max-w-[72ch] mx-auto">

        <!-- Back link -->
        <router-link
          to="/blog"
          class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10"
          style="font-family: Inter;"
        >
          <span>←</span> Blog
        </router-link>

        <!-- Meta -->
        <div class="flex items-center gap-3 mb-5">
          <span
            v-if="post.category"
            class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide"
          >
            {{ post.category }}
          </span>
          <span class="text-sm text-gray-400" style="font-family: Inter;">{{ formatDate(post.published_at) }}</span>
        </div>

        <!-- Title -->
        <h1
          class="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-[-0.06em] mb-10"
          style="font-family: Inter;"
        >
          {{ post.title }}
        </h1>

        <!-- Hero image -->
        <img
          v-if="post.featured_image"
          :src="post.featured_image"
          :alt="post.title"
          class="w-full aspect-video object-cover rounded-2xl mb-12"
        />

        <!-- Content -->
        <div class="blog-content" v-html="htmlContent" />

        <!-- Tags -->
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-14">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full"
            style="font-family: Inter;"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Author -->
        <AgentAuthor v-if="post.agent" :agent="post.agent" :date="post.published_at" />

        <!-- Footer nav -->
        <div class="mt-8 pb-4">
          <router-link
            to="/blog"
            class="inline-flex items-center gap-2 text-sm font-medium text-coolPurple hover:text-coolPink transition-colors"
            style="font-family: Inter;"
          >
            ← Volver al blog
          </router-link>
        </div>

      </div>
    </article>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { renderMarkdown } from '@/lib/markdown'
import AgentAuthor from '@/components/blog/AgentAuthor.vue'

const route = useRoute()
const store = useBlogStore()
const post = ref(null)
const htmlContent = ref('')
const loading = ref(true)

onMounted(async () => {
  post.value = await store.fetchPostBySlug(route.params.slug)
  if (post.value) {
    htmlContent.value = renderMarkdown(post.value.content)
  }
  loading.value = false
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
