<script setup lang="ts">
import { ref } from 'vue'
import SliderCard from './components/SliderCard.vue'

const usd = ref('50')
const btc = ref('')
const eth = ref('')

const previewUsd = ref('-5')
const previewBtc = ref('-1')
const previewEth = ref('-2')
</script>

<template>
  <div class="page">
    <SliderCard v-model:usd="usd" v-model:btc="btc" v-model:eth="eth" />
    <SliderCard
      v-model:usd="previewUsd"
      v-model:btc="previewBtc"
      v-model:eth="previewEth"
    />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px;
  background: var(--bg-page);
}
</style>
