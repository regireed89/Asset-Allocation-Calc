export const NUMERIC = /^(\d+\.?\d*|\.\d+)$/

export function isValid(v) {
  return v === '' || NUMERIC.test(v)
}
