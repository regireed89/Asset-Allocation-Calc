<script setup>
import { computed } from 'vue'

const props = defineProps({
  btcPercent: { type: String, default: '70' },
})

const btcShare = computed(() => {
  const amount = Number(props.btcPercent)
  if (!Number.isFinite(amount)) return 0
  return Math.min(100, Math.max(0, amount))
})

const ethShare = computed(() => 100 - btcShare.value)
</script>

<template>
  <div
    class="circle-graph"
    role="img"
    :aria-label="`BTC ${btcShare}% | ETH ${ethShare}%`"
  >
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <circle class="circle-graph-ring circle-graph-eth" cx="100" cy="100" r="78" />
      <circle
        class="circle-graph-ring circle-graph-btc"
        cx="100"
        cy="100"
        r="78"
        pathLength="100"
        :stroke-dasharray="`${btcShare} 100`"
        transform="rotate(-90 100 100)"
      />
    </svg>
    <div class="circle-graph-center">
      <div class="circle-graph-side">
        <span class="circle-graph-name">BTC</span>
        <span class="circle-graph-percent">{{ btcShare }}%</span>
      </div>
      <span class="circle-graph-divider" aria-hidden="true">|</span>
      <div class="circle-graph-side">
        <span class="circle-graph-name">ETH</span>
        <span class="circle-graph-percent">{{ ethShare }}%</span>
      </div>
    </div>
  </div>
</template>
