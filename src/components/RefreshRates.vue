<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  updatedAt: { type: Number, default: 0 },
  failedAt: { type: Number, default: 0 },
  busy: { type: Boolean, default: false },
})

const emit = defineEmits(['refresh'])

const now = ref(Date.now())
const showError = ref(false)
let clock
let errorTimer

const minutesAgo = computed(() => {
  if (!props.updatedAt) return null
  return Math.max(0, Math.floor((now.value - props.updatedAt) / 60000))
})

watch(
  () => props.failedAt,
  (value) => {
    if (!value) return
    showError.value = true
    clearTimeout(errorTimer)
    errorTimer = setTimeout(() => {
      showError.value = false
    }, 3000)
  },
)

watch(
  () => props.updatedAt,
  (value) => {
    if (value) now.value = value
    showError.value = false
    clearTimeout(errorTimer)
  },
)

onMounted(() => {
  clock = setInterval(() => {
    now.value = Date.now()
  }, 15000)
})

onUnmounted(() => {
  clearInterval(clock)
  clearTimeout(errorTimer)
})
</script>

<template>
  <div class="refresh">
    <button type="button" class="refresh-button" :disabled="busy" @click="emit('refresh')">
      Refresh Rates
    </button>
    <p v-if="showError" class="refresh-status refresh-status-error" role="alert">
      Error refreshing rates
    </p>
    <p v-else-if="minutesAgo !== null" class="refresh-status">
      Last updated {{ minutesAgo }} minutes ago
    </p>
  </div>
</template>
