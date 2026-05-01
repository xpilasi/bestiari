<template>
  <div class="min-h-screen bg-[#0B0B0B] flex items-center justify-center p-8">
    <div class="max-w-md w-full text-center">
      <!-- Loading -->
      <div v-if="loading" class="space-y-4">
        <div class="w-12 h-12 border-2 border-[#7B2FF7] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-[#6B6B6B]">Procesando...</p>
      </div>

      <!-- Success -->
      <div v-else-if="result?.success" class="space-y-6">
        <div class="text-6xl">{{ result.action === 'approve' ? '✅' : '🗑️' }}</div>
        <h1 class="text-2xl font-bold text-[#F7F7F8]">
          {{ result.action === 'approve' ? '¡Post publicado!' : 'Post rechazado' }}
        </h1>
        <p class="text-[#6B6B6B]">
          {{ result.action === 'approve'
            ? 'El post ya está visible en bestiari.es/blog'
            : 'El post ha sido descartado.' }}
        </p>
        <a
          href="/admin/blog"
          class="inline-block bg-[#7B2FF7] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Ir al panel admin →
        </a>
      </div>

      <!-- Error -->
      <div v-else class="space-y-6">
        <div class="text-6xl">⚠️</div>
        <h1 class="text-2xl font-bold text-[#F7F7F8]">Algo salió mal</h1>
        <p class="text-[#6B6B6B]">{{ result?.error ?? 'Token inválido o expirado.' }}</p>
        <a
          href="/admin/blog"
          class="inline-block bg-[#1a1a1a] text-[#F7F7F8] border border-[#2a2a2a] px-6 py-3 rounded-lg font-semibold hover:border-[#7B2FF7] transition-colors"
        >
          Ir al panel admin
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const loading = ref(true)
const result = ref(null)

onMounted(async () => {
  const token = new URLSearchParams(window.location.search).get('token')

  if (!token) {
    result.value = { success: false, error: 'Token no encontrado en la URL.' }
    loading.value = false
    return
  }

  try {
    const { data, error } = await supabase.rpc('handle_approval', { p_token: token })
    if (error) throw error
    result.value = data
  } catch (err) {
    result.value = { success: false, error: err.message }
  } finally {
    loading.value = false
  }
})
</script>
