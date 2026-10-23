<script setup lang="ts">
import { computed } from 'vue'
import { isValid } from '../utils/validation'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    placeholder?: string
  }>(),
  {
    placeholder: '0.00',
  },
)

const value = defineModel<string>({ default: '' })

const invalid = computed(() => !isValid(value.value))
const errorId = computed(() => `${props.id}-error`)
</script>

<template>
  <div class="amount-field">
    <label class="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="value"
      type="text"
      inputmode="decimal"
      autocomplete="off"
      :placeholder="placeholder"
      :class="{ invalid }"
      :aria-invalid="invalid"
      :aria-describedby="errorId"
    />
    <p :id="errorId" class="error" role="alert" v-show="invalid">Enter a valid amount</p>
  </div>
</template>

<style scoped>
.amount-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.amount-field input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 14px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  border-radius: 12px;
  background: var(--bg-input);
  border: 1px solid var(--border-input);
  color: var(--text);
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
