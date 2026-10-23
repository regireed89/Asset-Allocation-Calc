<script setup lang="ts">
import { computed } from 'vue'
import { isValid } from '../utils/validation'

const value = defineModel<string>({ default: '50' })

const invalid = computed(() => !isValid(value.value))
</script>

<template>
  <div class="usd-input">
    <label class="pill" for="usd">USD</label>
    <div class="field">
      <span class="prefix" aria-hidden="true">$</span>
      <input
        id="usd"
        v-model="value"
        type="text"
        inputmode="decimal"
        autocomplete="off"
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

<style scoped>
.usd-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.pill {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  background: var(--bg-pill);
  border-radius: 999px;
  padding: 4px 12px;
}

.field {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 260px;
  max-width: 100%;
}

.prefix {
  position: absolute;
  left: 18px;
  top: 0;
  height: 68px;
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
  color: var(--text-muted);
  pointer-events: none;
}

.field input {
  align-self: stretch;
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  text-align: center;
  font-family: inherit;
  font-size: 36px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  padding: 0 44px;
  border-radius: 14px;
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
  white-space: nowrap;
}
</style>
