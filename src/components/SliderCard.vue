<script setup>
import { computed, onMounted, ref, watch } from "vue";
import AmountField from "./AmountField.vue";
import AmountSlider from "./AmountSlider.vue";
import CircleGraph from "./CircleGraph.vue";
import RefreshRates from "./RefreshRates.vue";
import ResetButton from "./ResetButton.vue";
import UsdInput from "./UsdInput.vue";
import { coinAmount, coinPrice, splitUsd } from "../utils/coinAmount";
import { formatAmount } from "../utils/format";
import { loadExchangeRates } from "../utils/exchangeRates";

const usd = defineModel("usd", { default: "" });
const btc = defineModel("btc", { default: "0" });
const eth = defineModel("eth", { default: "0" });

const btcPercent = ref("70");
const rates = ref(null);
const rateError = ref("");
const usingStoredRates = ref(false);
const lastUpdated = ref(0);
const refreshing = ref(false);

async function pullRates() {
  if (refreshing.value) return;
  refreshing.value = true;
  try {
    const result = await loadExchangeRates();
    if (result.rates) rates.value = result.rates;
    if (result.error && rates.value) {
      usingStoredRates.value = true;
      rateError.value = "";
      return;
    }
    if (result.error) {
      usingStoredRates.value = false;
      rateError.value = "Could not load live prices. Try again.";
      return;
    }
    usingStoredRates.value = false;
    rateError.value = "";
    lastUpdated.value = Date.now();
  } finally {
    refreshing.value = false;
  }
}

const shares = computed(() => splitUsd(usd.value, btcPercent.value));

function priceText(rate) {
  const price = coinPrice(rate);
  return price === "" ? "" : formatAmount(price);
}

function spokenCoin(name, amount, dollars, each) {
  const parts = [`${name} ${amount}`, `${dollars} dollars`];
  if (each) parts.push(`${each} dollars each`);
  return parts.join(", ");
}

const spokenResults = computed(() => {
  if (!rates.value) return rateError.value ? "" : "Loading prices.";
  return `${spokenCoin(
    "BTC",
    formatAmount(btc.value, "BTC"),
    formatAmount(shares.value.btc),
    priceText(rates.value.btc),
  )}. ${spokenCoin(
    "ETH",
    formatAmount(eth.value, "ETH"),
    formatAmount(shares.value.eth),
    priceText(rates.value.eth),
  )}.`;
});

watch(
  [shares, rates],
  () => {
    if (!rates.value) {
      btc.value = "";
      eth.value = "";
      return;
    }
    btc.value = coinAmount(shares.value.btc, rates.value.btc);
    eth.value = coinAmount(shares.value.eth, rates.value.eth);
  },
  { immediate: true },
);

function resetCard() {
  usd.value = "";
  btcPercent.value = "70";
}

onMounted(() => {
  pullRates(false);
});
</script>

<template>
  <div class="card">
    <ResetButton @reset="resetCard" />
    <UsdInput v-model="usd" />
    <div class="slider-graph">
      <AmountSlider v-model="btcPercent" label="BTC percentage" step="1" />
      <CircleGraph :btc-percent="btcPercent" />
    </div>
    <div class="results">
      <p class="visually-hidden" aria-live="polite">{{ spokenResults }}</p>
      <div class="row">
        <AmountField
          id="btc"
          label="BTC"
          v-model="btc"
          readonly
          :placeholder="rates ? '0.00' : rateError ? '' : 'Loading'"
          :dollars="rates ? formatAmount(shares.btc) : ''"
          :price="priceText(rates?.btc)"
        />
        <AmountField
          id="eth"
          label="ETH"
          v-model="eth"
          readonly
          :placeholder="rates ? '0.00' : rateError ? '' : 'Loading'"
          :dollars="rates ? formatAmount(shares.eth) : ''"
          :price="priceText(rates?.eth)"
        />
      </div>
      <p v-if="usingStoredRates" class="rate-note">
        Current results may be using the previous rates.
      </p>
      <p v-else-if="rateError" class="rate-note rate-note-error" role="alert">
        {{ rateError }}
      </p>
    </div>
    <RefreshRates
      :updated-at="lastUpdated"
      :busy="refreshing"
      @refresh="pullRates"
    />
  </div>
</template>
