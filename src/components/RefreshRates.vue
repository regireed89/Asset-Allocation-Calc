<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  updatedAt: { type: Number, default: 0 },
  busy: { type: Boolean, default: false },
})

const emit = defineEmits(['refresh'])

const now = ref(Date.now())
let clock

const minutesAgo = computed(() => {
  if (!props.updatedAt) return null
  return Math.max(0, Math.floor((now.value - props.updatedAt) / 60000))
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
  clock = setInterval(() => {
    now.value = Date.now()
  }, 15000)
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
