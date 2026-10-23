<script setup>
import AmountField from "./AmountField.vue";
import AmountSlider from "./AmountSlider.vue";
import UsdInput from "./UsdInput.vue";

const usd = defineModel("usd", { default: "0" });
const btc = defineModel("btc", { default: "" });
const eth = defineModel("eth", { default: "" });
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
