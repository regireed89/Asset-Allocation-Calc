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
