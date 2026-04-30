<template>
  <div class="flex items-center gap-4 py-8 border-t border-gray-200 mt-14">
    <img
      :src="avatarSrc"
      :alt="agent.name"
      class="w-14 h-14 rounded-full object-cover bg-gray-200 flex-shrink-0"
    />
    <div>
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5" style="font-family: Inter;">Escrito por</p>
      <p class="font-semibold text-gray-900 tracking-[-0.03em]" style="font-family: Inter;">{{ agent.name }}</p>
      <p class="text-sm text-gray-500" style="font-family: Inter;">{{ agent.role }}</p>
    </div>
    <div class="ml-auto text-right hidden sm:block">
      <p class="text-xs text-gray-400" style="font-family: Inter;">{{ formattedDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import pandaImg    from '@/assets/img/animals/panda-avatar.png'
import conejaImg   from '@/assets/img/animals/coneja-cool.png'
import jabaliImg   from '@/assets/img/animals/jabali-cool.png'
import horseImg    from '@/assets/img/animals/horse-cool.png'
import leonaImg    from '@/assets/img/animals/leona-cool.png'
import foxImg      from '@/assets/img/animals/fox-cool.png'

const avatarMap = {
  'panda-avatar.png': pandaImg,
  'coneja-cool.png':  conejaImg,
  'jabali-cool.png':  jabaliImg,
  'horse-cool.png':   horseImg,
  'leona-cool.png':   leonaImg,
  'fox-cool.png':     foxImg,
}

const props = defineProps({
  agent: { type: Object, required: true },
  date:  { type: String, default: '' }
})

const avatarSrc = computed(() => avatarMap[props.agent.avatar] || pandaImg)

const formattedDate = computed(() => {
  if (!props.date) return ''
  return new Date(props.date).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
})
</script>
