const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function coinDigits(amount) {
  const size = Math.abs(amount)
  if (size < 1) return 5
  if (size < 100) return 4
  return 2
}

const smallUsd = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
})

export function formatAmount(value, currency = 'USD') {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return ''
  if (currency === 'USD') {
    if (amount !== 0 && Math.abs(amount) < 0.01) {
      const text = smallUsd.format(amount)
      if (Number(text) === 0) return String(value)
      return text
    }
    return usd
      .formatToParts(amount)
      .filter((part) => part.type !== 'currency')
      .map((part) => part.value)
      .join('')
      .trim()
  }
  if (amount === 0) return '0'
  const digits = coinDigits(amount)
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount)
}
