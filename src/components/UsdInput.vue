<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useFitText } from '../utils/fitText'
import { formatAmount } from '../utils/format'
import { blockedKeyMessage, limitUsdDigits, numericText, usdNotice, usdSizeMessage } from '../utils/validation'

const value = defineModel({ default: '' })
const focused = ref(false)
const blocked = ref('')

const message = computed(() => blocked.value || usdNotice(value.value))
const shown = computed(() => {
  if (focused.value || value.value === '' || usdNotice(value.value)) return value.value
  return formatAmount(value.value)
})

function onBeforeInput(event) {
  if (event.data == null) return
  const el = event.target
  const start = el.selectionStart ?? 0
  const end = el.selectionEnd ?? 0
  const rawNext = el.value.slice(0, start) + event.data + el.value.slice(end)
  const digits = numericText(rawNext)
  if (digits !== rawNext) {
    event.preventDefault()
    blocked.value = blockedKeyMessage(event.data)
    const caret = numericText(el.value.slice(0, start) + event.data).length
    const next = limitUsdDigits(digits)
    if (next !== el.value) value.value = next
    nextTick(() => el.setSelectionRange(caret, caret))
    return
  }
  if (limitUsdDigits(digits) !== digits) {
    event.preventDefault()
    blocked.value = usdSizeMessage
    return
  }
  blocked.value = ''
}

function onInput(event) {
  const raw = event.target.value
  const digits = numericText(raw)
  const next = limitUsdDigits(digits)
  if (digits !== raw) blocked.value = blockedKeyMessage(raw)
  else if (next !== digits) blocked.value = usdSizeMessage
  else blocked.value = ''
  value.value = next
  if (event.target.value !== next) event.target.value = next
}

function onBlur() {
  focused.value = false
}

watch(value, (next) => {
  if (next === '') blocked.value = ''
})

const visible = computed(() => shown.value || '0.00')
const { input, fontSize, width } = useFitText(visible, 48, 8, 120)
</script>

<template>
  <div class="usd-input">
    <label class="amount-label" for="usd">Amount to allocate</label>
    <div class="field">
      <span class="prefix" :style="{ fontSize: `${Math.round(fontSize * 0.8)}px` }" aria-hidden="true">$</span>
      <input
        id="usd"
        ref="input"
        :value="shown"
        :style="{ fontSize: `${fontSize}px` }"
        type="text"
        placeholder="0.00"
        inputmode="decimal"
        autocomplete="off"
        @focus="focused = true"
        @blur="onBlur"
        @beforeinput="onBeforeInput"
        @input="onInput"
        :class="{ invalid: message }"
        :aria-invalid="message ? true : undefined"
        aria-describedby="usd-error"
      />
      <span class="usd-code" :style="{ left: `min(calc(50% + ${width / 2}px + 12px), calc(100% - 72px))` }">USD</span>
      <p id="usd-error" class="error" role="alert" v-show="message">
        {{ message }}
      </p>
    </div>
  </div>
</template>
