<script setup>
import { ref } from 'vue'
import SliderCard from './components/SliderCard.vue'

const usd = ref('50')
const btc = ref('')
const eth = ref('')
</script>

<template>
  <div class="page">
    <SliderCard v-model:usd="usd" v-model:btc="btc" v-model:eth="eth" />
  </div>
</template>
