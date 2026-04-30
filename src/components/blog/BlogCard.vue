<template>
  <router-link :to="`/blog/${post.slug}`" class="block group">

    <!-- Desktop -->
    <div class="hidden lg:block relative w-full h-[340px] cursor-pointer rounded-2xl overflow-hidden transition-all duration-300">
      <img v-if="post.featured_image" :src="post.featured_image" :alt="post.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
      <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div class="absolute bottom-[20px] left-[20px] right-[20px] z-10">
        <div class="mb-3">
          <span class="inline-block px-3 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
            {{ post.category || 'Blog' }}
          </span>
        </div>
        <h3 class="text-white font-medium text-xl leading-tight tracking-[-0.06em] mb-4 line-clamp-2" style="font-family: Inter;">
          {{ post.title }}
        </h3>
        <div class="flex items-center justify-between">
          <div v-if="post.agent" class="flex items-center gap-2">
            <img :src="avatarSrc(post.agent.avatar)" :alt="post.agent.name"
              class="w-7 h-7 rounded-full object-cover bg-white" />
            <span class="text-gray-300 text-xs" style="font-family: Inter;">{{ post.agent.name }}</span>
          </div>
          <span class="text-gray-400 text-xs ml-auto" style="font-family: Inter;">{{ formatDate(post.published_at) }}</span>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="lg:hidden w-full flex-shrink-0">
      <div class="relative w-full h-[280px] cursor-pointer rounded-2xl overflow-hidden transition-all duration-300">
        <img v-if="post.featured_image" :src="post.featured_image" :alt="post.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
        <div v-else class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div class="absolute bottom-[20px] left-[20px] right-[20px] z-10">
          <div class="mb-2">
            <span class="inline-block px-2 py-1 bg-gradient-to-r from-coolPurple to-coolPink text-white text-xs font-semibold rounded-full uppercase tracking-wide">
              {{ post.category || 'Blog' }}
            </span>
          </div>
          <h3 class="text-white font-medium text-lg leading-tight tracking-[-0.06em] mb-3 line-clamp-2" style="font-family: Inter;">
            {{ post.title }}
          </h3>
          <div class="flex items-center justify-between">
            <div v-if="post.agent" class="flex items-center gap-2">
              <img :src="avatarSrc(post.agent.avatar)" :alt="post.agent.name"
                class="w-6 h-6 rounded-full object-cover bg-white" />
              <span class="text-gray-300 text-xs" style="font-family: Inter;">{{ post.agent.name }}</span>
            </div>
            <span class="text-gray-400 text-xs ml-auto" style="font-family: Inter;">{{ formatDate(post.published_at) }}</span>
          </div>
        </div>
      </div>
    </div>

  </router-link>
</template>

<script setup>
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

defineProps({ post: { type: Object, required: true } })

function avatarSrc(filename) {
  return avatarMap[filename] || pandaImg
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
