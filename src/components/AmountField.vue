<script setup>
import { computed, nextTick } from 'vue'
import { useFitText } from '../utils/fitText'
import { formatAmount } from '../utils/format'
import { isValid, numericText } from '../utils/validation'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, default: '0.00' },
  readonly: { type: Boolean, default: false },
})

const value = defineModel({ default: '' })

const invalid = computed(() => !isValid(value.value))
const errorId = computed(() => `${props.id}-error`)
const shown = computed(() =>
  props.readonly ? formatAmount(value.value, props.label) : value.value,
)

function onBeforeInput(event) {
  if (props.readonly || event.data == null) return
  const el = event.target
  const start = el.selectionStart ?? 0
  const end = el.selectionEnd ?? 0
  const rawNext = el.value.slice(0, start) + event.data + el.value.slice(end)
  const next = numericText(rawNext)
  if (next === rawNext) return
  event.preventDefault()
  const caret = numericText(el.value.slice(0, start) + event.data).length
  if (next !== el.value) value.value = next
  nextTick(() => el.setSelectionRange(caret, caret))
}

function onInput(event) {
  if (props.readonly) return
  const next = numericText(event.target.value)
  value.value = next
  if (event.target.value !== next) event.target.value = next
}

const { input, fontSize } = useFitText(shown, 22, 14)
</script>

<template>
  <div class="amount-field">
    <label class="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      ref="input"
      :value="shown"
      :style="{ fontSize: `${fontSize}px` }"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      :readonly="readonly"
      @beforeinput="onBeforeInput"
      @input="onInput"
      :placeholder="placeholder"
      :class="{ invalid }"
      :aria-invalid="invalid"
      :aria-describedby="errorId"
    />
    <p :id="errorId" class="error" role="alert" v-show="invalid">Enter a valid amount</p>
  </div>
</template>
