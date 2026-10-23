export const NUMERIC = /^(\d+\.?\d*|\.\d+)$/

export function isValid(v: string): boolean {
  return v === '' || NUMERIC.test(v)
}
