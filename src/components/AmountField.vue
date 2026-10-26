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
  dollars: { type: String, default: '' },
  price: { type: String, default: '' },
})

const value = defineModel({ default: '' })

const invalid = computed(() => !isValid(value.value))
const errorId = computed(() => `${props.id}-error`)
const shown = computed(() => {
  if (!props.readonly) return value.value
  if (value.value === '') return ''
  return formatAmount(value.value, props.label)
})
const fitted = computed(() => shown.value || props.placeholder)
const describedBy = computed(() => {
  const ids = [errorId.value]
  if (props.dollars) ids.push(`${props.id}-dollars`)
  if (props.price) ids.push(`${props.id}-price`)
  return ids.join(' ')
})

function onBeforeInput(event) {
  const typed = event.data
  if (props.readonly || typed == null) return
  const field = event.target
  const start = field.selectionStart ?? 0
  const end = field.selectionEnd ?? 0
  const nextText = field.value.slice(0, start) + typed + field.value.slice(end)
  const digits = numericText(nextText)
  if (digits === nextText) return
  event.preventDefault()
  const cursor = numericText(field.value.slice(0, start) + typed).length
  if (digits !== field.value) value.value = digits
  nextTick(() => field.setSelectionRange(cursor, cursor))
}

function onInput(event) {
  if (props.readonly) return
  const next = numericText(event.target.value)
  value.value = next
  if (event.target.value !== next) event.target.value = next
}

const largestType = 56
const smallestType = 8
const { input, fontSize } = useFitText(fitted, largestType, smallestType)
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
      :aria-invalid="!readonly && invalid ? true : undefined"
      :aria-describedby="describedBy"
    />
    <p v-if="dollars" :id="`${id}-dollars`" class="coin-dollars">${{ dollars }}</p>
    <p v-if="price" :id="`${id}-price`" class="coin-price">${{ price }} each</p>
    <p :id="errorId" class="error" role="alert" v-show="!readonly && invalid">Enter a valid amount</p>
  </div>
</template>
