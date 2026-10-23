const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const coin = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
})

export function formatAmount(value, currency = 'USD') {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return ''
  if (currency === 'USD') {
    return usd
      .formatToParts(amount)
      .filter((part) => part.type !== 'currency')
      .map((part) => part.value)
      .join('')
      .trim()
  }
  return coin.format(amount)
}
