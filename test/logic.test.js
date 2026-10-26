import assert from 'node:assert/strict'
import { test } from 'node:test'
import { coinAmount, splitUsd } from '../src/utils/coinAmount.js'
import { formatAmount } from '../src/utils/format.js'
import { blockedKeyMessage, limitUsdDigits, numericText, usdNotice } from '../src/utils/validation.js'

test('USD text keeps digits and one decimal point', () => {
  assert.equal(numericText('12a.3.4$'), '12.34')
  assert.equal(numericText(''), '')
  assert.equal(numericText('0'), '0')
  assert.equal(numericText('-5'), '5')
  assert.equal(blockedKeyMessage('-5'), 'Amounts cannot be negative.')
  assert.equal(blockedKeyMessage('a'), 'Use digits and one decimal point.')
  assert.equal(limitUsdDigits('1234567890123.5'), '123456789012.5')
  assert.equal(limitUsdDigits('123456789012.5'), '123456789012.5')
})

test('an empty USD amount is quiet and zero asks for more', () => {
  assert.equal(usdNotice(''), '')
  assert.equal(usdNotice('0'), 'Enter an amount greater than zero.')
  assert.equal(usdNotice('10.50'), '')
  assert.equal(usdNotice('10.'), '')
  assert.equal(usdNotice('0.001'), '')
  assert.equal(usdNotice('123456789012'), '')
  assert.equal(usdNotice('1234567890123'), 'Use at most 12 digits before the decimal.')
  assert.equal(usdNotice('.'), 'Enter a number.')
  assert.equal(formatAmount('0.001'), '0.001')
  assert.equal(formatAmount('10.50'), '10.50')
  assert.equal(formatAmount('1000000000'), '1,000,000,000.00')
})

test('ETH dollars are what is left after BTC', () => {
  const even = splitUsd('100', 70)
  assert.equal(even.btc + even.eth, 100)
  assert.equal(coinAmount(even.btc, '0.00002'), '0.0014')
  assert.equal(coinAmount(even.eth, '2'), '60')
  const tight = splitUsd('0.1', 70)
  assert.equal(tight.btc + tight.eth, 0.1)
})

test('an empty amount or a missing rate buys no coin', () => {
  assert.deepEqual(splitUsd('', 70), { btc: 0, eth: 0 })
  assert.equal(coinAmount(70, undefined), '0')
  assert.equal(coinAmount('1e21', 1), '0')
})

test('a coin amount uses fewer decimals as it grows', () => {
  assert.equal(formatAmount('0.123456789', 'BTC'), '0.12346')
  assert.equal(formatAmount('12.34567', 'ETH'), '12.3457')
  assert.equal(formatAmount('1234.5', 'BTC'), '1,234.50')
  assert.equal(formatAmount('0', 'ETH'), '0')
})
