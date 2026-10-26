const EXCHANGE_RATES_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=USD'
const STORAGE_KEY = 'asset-allocation-exchange-rates'

function storedPair() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
    const btcRate = Number(saved && saved.btc)
    const ethRate = Number(saved && saved.eth)
    if (btcRate > 0 && ethRate > 0) return { btc: String(saved.btc), eth: String(saved.eth) }
    return null
  } catch {
    return null
  }
}

function livePair(body) {
  const rates = body && body.data && body.data.rates
  const btcRate = Number(rates && rates.BTC)
  const ethRate = Number(rates && rates.ETH)
  if (!(btcRate > 0)) throw new Error('Could not get the BTC exchange rate')
  if (!(ethRate > 0)) throw new Error('Could not get the ETH exchange rate')
  return { btc: String(rates.BTC), eth: String(rates.ETH) }
}

export async function loadExchangeRates() {
  const stored = storedPair()

  try {
    const response = await fetch(EXCHANGE_RATES_URL)
    if (!response.ok) throw new Error('Could not get the BTC or ETH exchange rate')
    const next = livePair(await response.json())
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Fresh rates can still be used when storage is unavailable.
    }
    return { rates: next, stale: false, error: null }
  } catch (error) {
    let failure = new Error('Could not get the BTC or ETH exchange rate')
    if (error instanceof Error && error.message.startsWith('Could not get')) failure = error
    if (stored) return { rates: stored, stale: true, error: failure }
    return { rates: null, stale: false, error: failure }
  }
}
