<script setup>
import { computed } from 'vue'
import { isValid } from '../utils/validation'

defineProps({
  label: { type: String, default: 'USD amount' },
  step: { type: String, default: 'any' },
})

const value = defineModel({ default: '0' })

const sliderValue = computed(() => {
  const current = value.value
  if (current === '' || !isValid(current)) return 0
  const amount = Number(current)
  if (!Number.isFinite(amount)) return 0
  return Math.min(100, Math.max(0, amount))
})

const sliderPosition = computed(() => {
  const ratio = sliderValue.value / 100
  return `calc(${ratio} * (100% - 36px) + 18px)`
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
      :step="step"
      :aria-label="label"
      :value="sliderValue"
      @input="onInput"
    />
    <span class="slider-value" :style="{ left: sliderPosition }" aria-hidden="true">
      {{ sliderValue }}
    </span>
    <div class="scale">
      <span>0%</span>
      <span>100%</span>
    </div>
  </div>
</template>
