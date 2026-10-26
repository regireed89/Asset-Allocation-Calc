export const NUMERIC = /^(\d+\.?\d*|\.\d+)$/

export function isValid(v) {
  return v === '' || NUMERIC.test(v)
}

export function numericText(value) {
  let dot = false
  let text = ''
  for (const char of String(value)) {
    if (char >= '0' && char <= '9') text += char
    else if (char === '.' && !dot) {
      dot = true
      text += '.'
    }
  }
  return text
}

export const usdSizeMessage = 'Use at most 12 digits before the decimal.'

export function limitUsdDigits(value) {
  const text = String(value)
  const dot = text.indexOf('.')
  const whole = dot === -1 ? text : text.slice(0, dot)
  if (whole.length <= 12) return text
  const rest = dot === -1 ? '' : text.slice(dot)
  return whole.slice(0, 12) + rest
}

export function usdNotice(value) {
  if (value === '') return ''
  if (!isValid(value)) return 'Enter a number.'
  if (limitUsdDigits(value) !== String(value)) return usdSizeMessage
  if (Number(value) === 0) return 'Enter an amount greater than zero.'
  return ''
}

export function blockedKeyMessage(text) {
  if (String(text).includes('-')) return 'Amounts cannot be negative.'
  return 'Use digits and one decimal point.'
}
