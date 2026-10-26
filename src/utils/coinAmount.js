import { isValid } from './validation.js'

export function splitUsd(dollars, btcPercent) {
  if (dollars === '' || !isValid(dollars)) return { btc: 0, eth: 0 }
  const usdAmount = Number(dollars)
  const percent = Number(btcPercent)
  if (!Number.isFinite(usdAmount)) return { btc: 0, eth: 0 }
  const share = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0
  const btc = usdAmount * (share / 100)
  return { btc, eth: usdAmount - btc }
}

export function coinAmount(usdShare, rate) {
  const share = Number(usdShare)
  const unitRate = Number(rate)
  if (!Number.isFinite(share) || !Number.isFinite(unitRate)) return '0'
  const amount = share * unitRate
  if (!Number.isFinite(amount) || amount === 0) return '0'
  const text = amount.toFixed(8)
  if (text.includes('e')) return '0'
  const plain = text.replace(/\.?0+$/, '')
  return plain === '' ? '0' : plain
}

export function coinPrice(rate) {
  const unit = Number(rate)
  if (!(unit > 0)) return ''
  return 1 / unit
}
