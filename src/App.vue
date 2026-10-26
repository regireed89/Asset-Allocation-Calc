<script setup>
import { ref } from 'vue'
import SliderCard from './components/SliderCard.vue'

const usd = ref('')
const btc = ref('')
const eth = ref('')
</script>

<template>
  <div class="page">
    <h1 class="title">Asset allocation calculator</h1>
    <SliderCard v-model:usd="usd" v-model:btc="btc" v-model:eth="eth" />
  </div>
</template>
