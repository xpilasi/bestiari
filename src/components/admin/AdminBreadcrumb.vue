<template>
  <div v-if="isAdmin" class="w-full bg-gray-900 text-gray-300 text-xs px-4 py-2 flex items-center gap-2">
    <router-link to="/admin/blog" class="hover:text-white transition-colors">Admin</router-link>
    <span class="text-gray-600">/</span>
    <router-link to="/blog" class="hover:text-white transition-colors">Blog</router-link>
    <template v-if="label">
      <span class="text-gray-600">/</span>
      <span class="text-gray-400 truncate max-w-xs">{{ label }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { isAdminLoggedIn } from '@/lib/auth'

defineProps({
  label: { type: String, default: '' }
})

const isAdmin = computed(() => isAdminLoggedIn())
</script>
