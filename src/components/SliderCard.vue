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
const refreshFailedAt = ref(0);
const refreshing = ref(false);

async function pullRates(fromButton) {
  if (refreshing.value) return;
  refreshing.value = true;
  try {
    const result = await loadExchangeRates();
    rates.value = result.rates;
    usingStoredRates.value = result.stale;
    rateError.value = result.error?.message ?? "";
    if (result.error) {
      if (fromButton) refreshFailedAt.value = Date.now();
      return;
    }
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

watch(
  [shares, rates],
  () => {
    if (!rates.value) {
      btc.value = "0";
      eth.value = "0";
      return;
    }
    btc.value = coinAmount(shares.value.btc, rates.value.btc);
    eth.value = coinAmount(shares.value.eth, rates.value.eth);
  },
  { immediate: true },
);

function resetCard() {
  usd.value = "";
  btc.value = "0";
  eth.value = "0";
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
    <AmountSlider v-model="btcPercent" label="BTC percentage" step="1" />
    <CircleGraph :btc-percent="btcPercent" />
    <div class="results">
      <div class="row">
        <AmountField
          id="btc"
          label="BTC"
          v-model="btc"
          readonly
          :dollars="formatAmount(shares.btc)"
          :price="priceText(rates?.btc)"
        />
        <AmountField
          id="eth"
          label="ETH"
          v-model="eth"
          readonly
          :dollars="formatAmount(shares.eth)"
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
      :failed-at="refreshFailedAt"
      :busy="refreshing"
      @refresh="pullRates(true)"
    />
  </div>
</template>
