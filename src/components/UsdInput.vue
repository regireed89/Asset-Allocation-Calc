<script setup>
import { computed } from 'vue'
import { isValid } from '../utils/validation'

const value = defineModel({ default: '0' })

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
