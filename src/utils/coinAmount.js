import { isValid } from './validation.js'

function dropTrailingZeros(text) {
  let end = text.length
  while (end > 0 && text[end - 1] === '0') end -= 1
  if (end > 0 && text[end - 1] === '.') end -= 1
  const plain = text.slice(0, end)
  if (plain === '') return '0'
  return plain
}

export function splitUsd(dollars, btcPercent) {
  if (dollars === '' || !isValid(dollars)) return { btc: 0, eth: 0 }
  const usdAmount = Number(dollars)
  if (!Number.isFinite(usdAmount)) return { btc: 0, eth: 0 }
  const percent = Number(btcPercent)
  const btcShare = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0
  const btc = usdAmount * (btcShare / 100)
  const eth = usdAmount - btc
  return { btc, eth }
}

export function coinAmount(usdShare, rate) {
  const dollars = Number(usdShare)
  const coinsPerDollar = Number(rate)
  if (!Number.isFinite(dollars) || !Number.isFinite(coinsPerDollar)) return '0'
  const coins = dollars * coinsPerDollar
  if (!Number.isFinite(coins) || coins === 0) return '0'
  const text = coins.toFixed(8)
  if (text.includes('e')) return '0'
  return dropTrailingZeros(text)
}

export function coinPrice(rate) {
  const coinsPerDollar = Number(rate)
  if (coinsPerDollar > 0) return 1 / coinsPerDollar
  return ''
}
