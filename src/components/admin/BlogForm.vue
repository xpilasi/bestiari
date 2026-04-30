<template>
  <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">{{ post ? 'Editar post' : 'Nuevo post' }}</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
      </div>

      <form @submit.prevent="save" class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input v-model="form.title" @input="autoSlug" type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input v-model="form.slug" type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
          <textarea v-model="form.excerpt" rows="2" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenido (Markdown) *</label>
          <textarea v-model="form.content" rows="12" required class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select v-model="form.status" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option value="draft">Draft</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <input v-model="form.category" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags (separados por coma)</label>
          <input v-model="tagsInput" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="fauna, mamíferos, ibérico" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Imagen destacada (URL)</label>
          <input v-model="form.featured_image" type="url" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>

        <p v-if="saveError" class="text-sm text-red-500">{{ saveError }}</p>

        <div class="flex gap-3 pt-2">
          <button type="submit" :disabled="saving" class="bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50">
            {{ saving ? 'Guardando…' : 'Guardar' }}
          </button>
          <button type="button" @click="$emit('close')" class="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useBlogStore } from '@/stores/blog'

const props = defineProps({ post: Object })
const emit = defineEmits(['close', 'saved'])
const store = useBlogStore()

const form = ref({
  title: props.post?.title || '',
  slug: props.post?.slug || '',
  excerpt: props.post?.excerpt || '',
  content: props.post?.content || '',
  status: props.post?.status || 'draft',
  category: props.post?.category || '',
  featured_image: props.post?.featured_image || ''
})

const tagsInput = ref(props.post?.tags?.join(', ') || '')
const saving = ref(false)
const saveError = ref('')
let slugTouched = !!props.post

function autoSlug() {
  if (slugTouched) return
  form.value.slug = form.value.title
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

watch(() => form.value.slug, () => { slugTouched = true })

async function save() {
  saving.value = true
  saveError.value = ''
  try {
    const payload = {
      ...form.value,
      tags: tagsInput.value ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean) : [],
      published_at: form.value.status === 'published' && !props.post?.published_at
        ? new Date().toISOString()
        : props.post?.published_at || null
    }
    if (props.post?.id) {
      await store.updatePost(props.post.id, payload)
    } else {
      await store.createPost(payload)
    }
    emit('saved')
    emit('close')
  } catch (e) {
    saveError.value = e.message
  } finally {
    saving.value = false
  }
}
</script>

