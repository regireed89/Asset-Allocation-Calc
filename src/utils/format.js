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

const underOneCent = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
})

function dollarsWithoutSign(amount) {
  let text = ''
  for (const part of usd.formatToParts(amount)) {
    if (part.type === 'currency') continue
    text += part.value
  }
  return text.trim()
}

export function formatAmount(value, currency = 'USD') {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return ''
  if (currency === 'USD') {
    const smallerThanOneCent = amount !== 0 && Math.abs(amount) < 0.01
    if (smallerThanOneCent) {
      const text = underOneCent.format(amount)
      if (Number(text) === 0) return String(value)
      return text
    }
    return dollarsWithoutSign(amount)
  }
  if (amount === 0) return '0'
  const digits = coinDigits(amount)
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount)
}
