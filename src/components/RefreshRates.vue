<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  updatedAt: { type: Number, default: 0 },
  busy: { type: Boolean, default: false },
})

const emit = defineEmits(['refresh'])

const now = ref(Date.now())
let clock

const oneMinute = 60 * 1000

const minutesAgo = computed(() => {
  if (!props.updatedAt) return null
  const elapsed = now.value - props.updatedAt
  return Math.max(0, Math.floor(elapsed / oneMinute))
})

const stamp = computed(() => {
  if (minutesAgo.value === null) return ''
  if (minutesAgo.value === 0) return 'Updated just now, may be stale'
  return `Updated ${minutesAgo.value} min ago, may be stale`
})

watch(
  () => props.updatedAt,
  (value) => {
    if (value) now.value = value
  },
)

onMounted(() => {
  const tick = 15 * 1000
  clock = setInterval(() => {
    now.value = Date.now()
  }, tick)
})

onUnmounted(() => {
  clearInterval(clock)
})
</script>

<template>
  <div class="refresh">
    <button type="button" class="refresh-button" :disabled="busy" @click="emit('refresh')">
      Refresh Rates
    </button>
    <p v-if="stamp" class="refresh-status">{{ stamp }}</p>
  </div>
</template>
