<script setup>
import { computed } from 'vue'
import { isValid } from '../utils/validation'

const value = defineModel({ default: '0' })

const sliderValue = computed(() => {
  const current = value.value
  if (current === '' || !isValid(current)) return 0
  const amount = Number(current)
  if (!Number.isFinite(amount)) return 0
  return amount
})

function onInput(event) {
  value.value = event.target.value
}
</script>

<template>
  <div class="amount-slider">
    <input
      class="slider"
      type="range"
      min="0"
      max="100"
      step="any"
      aria-label="USD amount"
      :value="sliderValue"
      @input="onInput"
    />
    <div class="scale">
      <span>0</span>
      <span>100</span>
    </div>
  </div>
</template>
