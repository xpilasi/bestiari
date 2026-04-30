<template>
  <div class="min-h-screen bg-gray-50" @click="openMenuId = null">
    <AdminBreadcrumb />
    <div class="max-w-5xl mx-auto px-4 py-10">

      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-xl font-bold text-gray-900">Blog Manager</h1>
        <div class="flex gap-3 items-center">
          <button @click="showForm = true" class="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
            + Nuevo
          </button>
          <button @click="logout" class="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">Salir</button>
        </div>
      </div>

      <!-- Search -->
      <input v-model="search" type="search" placeholder="Buscar posts…"
        class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-amber-500" />

      <div v-if="store.loading" class="text-center py-16 text-gray-400 text-sm">Cargando…</div>

      <template v-else>

        <!-- DESKTOP: tabla (md+) -->
        <div class="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th class="px-5 py-3 font-medium">Título</th>
                <th class="px-5 py-3 font-medium">Estado</th>
                <th class="px-5 py-3 font-medium">Autor</th>
                <th class="px-5 py-3 font-medium">Categoría</th>
                <th class="px-5 py-3 font-medium">Fecha</th>
                <th class="px-5 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="filtered.length === 0">
                <td colspan="6" class="px-5 py-8 text-center text-gray-400">No hay posts.</td>
              </tr>
              <tr v-for="post in filtered" :key="post.id" class="hover:bg-gray-50">
                <td class="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">{{ post.title }}</td>
                <td class="px-5 py-3">
                  <span :class="post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                    class="text-xs font-medium px-2 py-0.5 rounded-full">
                    {{ post.status === 'published' ? 'Publicado' : 'Draft' }}
                  </span>
                </td>
                <td class="px-5 py-3">
                  <div v-if="post.agent" class="flex items-center gap-2">
                    <img :src="avatarSrc(post.agent.avatar)" :alt="post.agent.name" class="w-6 h-6 rounded-full object-cover bg-white border border-gray-100" />
                    <span class="text-gray-700 text-xs">{{ post.agent.name }}</span>
                  </div>
                  <span v-else class="text-gray-400">—</span>
                </td>
                <td class="px-5 py-3 text-gray-500">{{ post.category || '—' }}</td>
                <td class="px-5 py-3 text-gray-400">{{ formatDate(post.created_at) }}</td>
                <td class="px-5 py-3">
                  <div class="flex gap-1">
                    <button @click.stop="previewing = post" class="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="Ver">
                      <Eye :size="15" />
                    </button>
                    <button @click.stop="edit(post)" class="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" title="Editar">
                      <Pencil :size="15" />
                    </button>
                    <button @click.stop="remove(post)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Eliminar">
                      <Trash2 :size="15" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- MOBILE: cards (< md) -->
        <div class="md:hidden space-y-3">
          <p v-if="filtered.length === 0" class="text-center py-12 text-gray-400 text-sm">No hay posts.</p>

          <div v-for="post in filtered" :key="post.id"
            class="bg-white rounded-2xl px-4 py-4 shadow-sm flex items-center gap-3">

            <!-- Avatar -->
            <img v-if="post.agent" :src="avatarSrc(post.agent.avatar)" :alt="post.agent.name"
              class="w-9 h-9 rounded-full object-cover bg-white border border-gray-100 flex-shrink-0" />
            <div v-else class="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0" />

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ post.title }}</p>
              <div class="flex items-center gap-2 mt-1">
                <span :class="post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'"
                  class="text-xs font-medium px-2 py-0.5 rounded-full">
                  {{ post.status === 'published' ? 'Publicado' : 'Draft' }}
                </span>
                <span v-if="post.category" class="text-xs text-gray-400">{{ post.category }}</span>
              </div>
            </div>

            <!-- Ellipsis menu -->
            <div class="relative flex-shrink-0">
              <button @click.stop="openMenuId = openMenuId === post.id ? null : post.id"
                class="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <MoreVertical :size="16" />
              </button>

              <Transition name="menu">
                <div v-if="openMenuId === post.id"
                  class="absolute right-0 top-10 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-36">
                  <button @click.stop="previewing = post; openMenuId = null"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <Eye :size="14" /> Ver
                  </button>
                  <button @click.stop="edit(post); openMenuId = null"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <Pencil :size="14" /> Editar
                  </button>
                  <button @click.stop="remove(post); openMenuId = null"
                    class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer">
                    <Trash2 :size="14" /> Eliminar
                  </button>
                </div>
              </Transition>
            </div>

          </div>
        </div>

      </template>
    </div>

    <BlogForm v-if="showForm" :post="editing" @close="showForm = false; editing = null" @saved="store.fetchAllPosts()" />
    <BlogPreviewModal v-if="previewing" :post="previewing" @close="previewing = null" />
  </div>
</template>

<script setup>
import { Pencil, Trash2, Eye, MoreVertical } from 'lucide-vue-next'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { logoutAdmin } from '@/lib/auth'
import BlogForm from '@/components/admin/BlogForm.vue'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb.vue'
import BlogPreviewModal from '@/components/admin/BlogPreviewModal.vue'
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
function avatarSrc(filename) { return avatarMap[filename] || pandaImg }

const store = useBlogStore()
const router = useRouter()
const search = ref('')
const showForm = ref(false)
const editing = ref(null)
const previewing = ref(null)
const openMenuId = ref(null)

onMounted(() => store.fetchAllPosts())

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return store.posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q)
  )
})

function edit(post) {
  editing.value = post
  showForm.value = true
}

async function remove(post) {
  if (!confirm(`¿Eliminar "${post.title}"?`)) return
  await store.deletePost(post.id)
}

function logout() {
  logoutAdmin()
  router.push('/admin/login')
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.menu-enter-active, .menu-leave-active { transition: all 0.15s ease; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: scale(0.95) translateY(-4px); }
</style>
