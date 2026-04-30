<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto" @click.self="$emit('close')">
    <div class="relative bg-bg-primary w-full max-w-[72ch] mx-4 my-10 rounded-2xl shadow-2xl">

      <!-- Header -->
      <div class="flex items-center justify-between px-8 pt-6 pb-4 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <span v-if="post.category"
            class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
            {{ post.category }}
          </span>
          <span class="text-xs text-gray-400" style="font-family: Inter;">{{ formatDate(post.published_at) }}</span>
        </div>
        <button @click="$emit('close')" class="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
          <X :size="18" />
        </button>
      </div>

      <!-- Content -->
      <div class="px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 leading-tight tracking-[-0.06em] mb-8" style="font-family: Inter;">
          {{ post.title }}
        </h1>

        <img v-if="post.featured_image" :src="post.featured_image" :alt="post.title"
          class="w-full aspect-video object-cover rounded-2xl mb-10" />

        <div class="blog-content" v-html="htmlContent" />

        <!-- Author -->
        <div v-if="post.agent" class="flex items-center gap-3 mt-12 pt-6 border-t border-gray-200">
          <img :src="avatarSrc(post.agent.avatar)" :alt="post.agent.name"
            class="w-10 h-10 rounded-full object-cover bg-white" />
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide" style="font-family: Inter;">Escrito por</p>
            <p class="text-sm font-semibold text-gray-900" style="font-family: Inter;">{{ post.agent.name }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import { renderMarkdown } from '@/lib/markdown'
import pandaImg  from '@/assets/img/animals/panda-avatar.png'
import conejaImg from '@/assets/img/animals/coneja-cool.png'
import jabaliImg from '@/assets/img/animals/jabali-cool.png'
import horseImg  from '@/assets/img/animals/horse-cool.png'
import leonaImg  from '@/assets/img/animals/leona-cool.png'
import foxImg    from '@/assets/img/animals/fox-cool.png'

const avatarMap = {
  'panda-avatar.png': pandaImg,
  'coneja-cool.png':  conejaImg,
  'jabali-cool.png':  jabaliImg,
  'horse-cool.png':   horseImg,
  'leona-cool.png':   leonaImg,
  'fox-cool.png':     foxImg,
}

const props = defineProps({ post: { type: Object, required: true } })
defineEmits(['close'])

const htmlContent = computed(() => renderMarkdown(props.post.content || ''))

function avatarSrc(filename) { return avatarMap[filename] || pandaImg }

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>
