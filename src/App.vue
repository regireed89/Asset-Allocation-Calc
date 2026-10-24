<script setup>
import { ref } from 'vue'
import SliderCard from './components/SliderCard.vue'

const usd = ref('0')
const btc = ref('0')
const eth = ref('0')
</script>

<template>
  <div class="page">
    <h1 class="title">Asset allocation calculator</h1>
    <SliderCard v-model:usd="usd" v-model:btc="btc" v-model:eth="eth" />
  </div>
</template>
