<script setup>
import { computed } from 'vue'
import { formatAmount } from '../utils/format'
import { isValid } from '../utils/validation'

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

function onInput(event) {
  if (props.readonly) return
  value.value = event.target.value
}
</script>

<template>
  <div class="amount-field">
    <label class="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :value="shown"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      :readonly="readonly"
      @input="onInput"
      :placeholder="placeholder"
      :class="{ invalid }"
      :aria-invalid="invalid"
      :aria-describedby="errorId"
    />
    <p :id="errorId" class="error" role="alert" v-show="invalid">Enter a valid amount</p>
  </div>
</template>
