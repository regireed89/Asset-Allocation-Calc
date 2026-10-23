<script setup lang="ts">
import AmountField from './AmountField.vue'
import AmountSlider from './AmountSlider.vue'
import UsdInput from './UsdInput.vue'

const usd = defineModel<string>('usd', { default: '50' })
const btc = defineModel<string>('btc', { default: '' })
const eth = defineModel<string>('eth', { default: '' })
</script>

<template>
  <div class="card">
    <UsdInput v-model="usd" />
    <AmountSlider v-model="usd" />
    <div class="row">
      <AmountField id="btc" label="BTC" v-model="btc" />
      <AmountField id="eth" label="ETH" v-model="eth" />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 480px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 24px;
  box-shadow: 0 12px 32px rgba(31, 58, 51, 0.08);
  font-family: Inter, 'Helvetica Neue', Arial, sans-serif;
  font-variant-numeric: tabular-nums;
}

.row {
  display: flex;
  gap: 16px;
}

.row > * {
  flex: 1;
  min-width: 0;
}
</style>
