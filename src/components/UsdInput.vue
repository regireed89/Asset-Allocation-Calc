<script setup>
import { computed, ref } from 'vue'
import { useFitText } from '../utils/fitText'
import { formatAmount } from '../utils/format'
import { isValid } from '../utils/validation'

const value = defineModel({ default: '0' })
const focused = ref(false)

const invalid = computed(() => !isValid(value.value))
const shown = computed(() => {
  if (focused.value || value.value === '' || invalid.value) return value.value
  return formatAmount(value.value)
})

function onInput(event) {
  value.value = event.target.value
}

function onBlur() {
  focused.value = false
  if (value.value !== '' && isValid(value.value)) {
    value.value = String(Number(value.value))
  }
}

const { input, fontSize } = useFitText(shown, 48, 24)
</script>

<template>
  <div class="usd-input">
    <label class="pill" for="usd">USD</label>
    <div class="field">
      <span class="prefix" :style="{ fontSize: `${Math.round(fontSize * 0.8)}px` }" aria-hidden="true">$</span>
      <input
        id="usd"
        ref="input"
        :value="shown"
        :style="{ fontSize: `${fontSize}px` }"
        type="text"
        inputmode="decimal"
        autocomplete="off"
        @focus="focused = true"
        @blur="onBlur"
        @input="onInput"
        :class="{ invalid }"
        :aria-invalid="invalid"
        aria-describedby="usd-error"
      />
      <p id="usd-error" class="error" role="alert" v-show="invalid">
        Enter a valid amount of 0 or more
      </p>
    </div>
  </div>
</template>
