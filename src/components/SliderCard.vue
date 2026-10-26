<script setup>
import { onMounted, ref, watch } from "vue";
import AmountField from "./AmountField.vue";
import AmountSlider from "./AmountSlider.vue";
import RefreshRates from "./RefreshRates.vue";
import ResetButton from "./ResetButton.vue";
import UsdInput from "./UsdInput.vue";
import { isValid } from "../utils/validation";
import { loadExchangeRates } from "../utils/exchangeRates";

const usd = defineModel("usd", { default: "0" });
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

function formatAmount(amount) {
  if (!Number.isFinite(amount) || amount === 0) return "0";
  const text = amount.toFixed(8).replace(/\.?0+$/, "");
  return text === "" ? "0" : text;
}

function shareAmount(dollars, percent, rate) {
  if (!rates.value || dollars === "" || !isValid(dollars)) return "0";
  const usdAmount = Number(dollars);
  const share = Number(percent);
  const unitRate = Number(rate);
  if (
    !Number.isFinite(usdAmount) ||
    !Number.isFinite(share) ||
    !Number.isFinite(unitRate)
  ) {
    return "0";
  }
  return formatAmount(usdAmount * (share / 100) * unitRate);
}

watch(
  [usd, btcPercent, rates],
  () => {
    const percent = Number(btcPercent.value);
    const btcShare = Number.isFinite(percent)
      ? Math.min(100, Math.max(0, percent))
      : 0;
    btc.value = shareAmount(usd.value, btcShare, rates.value?.btc);
    eth.value = shareAmount(usd.value, 100 - btcShare, rates.value?.eth);
  },
  { immediate: true },
);

function resetCard() {
  usd.value = "0";
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
    <div class="results">
      <div class="row">
        <AmountField id="btc" label="BTC" v-model="btc" readonly />
        <AmountField id="eth" label="ETH" v-model="eth" readonly />
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
