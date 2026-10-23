const EXCHANGE_RATES_URL = 'https://api.coinbase.com/v2/exchange-rates?currency=USD'
const STORAGE_KEY = 'asset-allocation-exchange-rates'

export async function loadExchangeRates() {
  let stored = null
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '')
    if (Number(saved?.btc) > 0 && Number(saved?.eth) > 0) {
      stored = { btc: String(saved.btc), eth: String(saved.eth) }
    }
  } catch {
    stored = null
  }

  try {
    const response = await fetch(EXCHANGE_RATES_URL)
    if (!response.ok) throw new Error('Could not get the BTC or ETH exchange rate')
    const rates = (await response.json())?.data?.rates
    if (!(Number(rates?.BTC) > 0)) throw new Error('Could not get the BTC exchange rate')
    if (!(Number(rates?.ETH) > 0)) throw new Error('Could not get the ETH exchange rate')

    const next = { btc: String(rates.BTC), eth: String(rates.ETH) }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Fresh rates can still be used when storage is unavailable.
    }
    return { rates: next, stale: false, error: null }
  } catch (error) {
    const failure =
      error instanceof Error && error.message.startsWith('Could not get')
        ? error
        : new Error('Could not get the BTC or ETH exchange rate')
    if (stored) return { rates: stored, stale: true, error: failure }
    return { rates: null, stale: false, error: failure }
  }
}
