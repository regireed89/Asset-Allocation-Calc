<script setup lang="ts">
import { computed } from 'vue'
import { isValid } from '../utils/validation'

const value = defineModel<string>({ default: '0' })

const sliderValue = computed(() => {
  const current = value.value
  if (current === '' || !isValid(current)) return 0
  const amount = Number(current)
  if (!Number.isFinite(amount)) return 0
  return amount
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  value.value = target.value
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

<style scoped>
.amount-slider {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 44px;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
}

.slider:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 8px;
}

.slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
  background: var(--track);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  margin-top: -10px;
  border-radius: 50%;
  background: var(--accent);
  border: 4px solid var(--bg-card);
  box-shadow: 0 1px 5px rgba(31, 58, 51, 0.35);
}

.slider::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: var(--track);
  border: none;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  border: 4px solid var(--bg-card);
  box-shadow: 0 1px 5px rgba(31, 58, 51, 0.35);
}

.scale {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
}

input::placeholder {
  color: var(--placeholder);
  opacity: 1;
}

input[type='text']:focus-visible {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(47, 125, 107, 0.22);
}

input.invalid,
input.invalid:focus-visible {
  outline: none;
  border-color: var(--error-strong);
  background: var(--error-bg);
  color: var(--error-text);
  box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.16);
}

.error {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--error);
}
</style>
