<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Admin</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <p v-if="error" class="text-sm text-red-500">Contraseña incorrecta.</p>
        <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '@/lib/auth'

const password = ref('')
const error = ref(false)
const router = useRouter()

function handleLogin() {
  error.value = false
  if (loginAdmin(password.value)) {
    router.push('/admin/blog')
  } else {
    error.value = true
  }
}
</script>
