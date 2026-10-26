import { isValid } from './validation.js'

function trimCoin(amount) {
  if (!Number.isFinite(amount) || amount === 0) return '0'
  const text = amount.toFixed(8).replace(/\.?0+$/, '')
  return text === '' ? '0' : text
}

export function coinAmount(dollars, percent, rate) {
  if (dollars === '' || !isValid(dollars)) return '0'
  const usdAmount = Number(dollars)
  const share = Number(percent)
  const unitRate = Number(rate)
  if (
    !Number.isFinite(usdAmount) ||
    !Number.isFinite(share) ||
    !Number.isFinite(unitRate)
  ) {
    return '0'
  }
  return trimCoin(usdAmount * (share / 100) * unitRate)
}
