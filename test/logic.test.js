import assert from 'node:assert/strict'
import { test } from 'node:test'
import { coinAmount } from '../src/utils/coinAmount.js'
import { formatAmount } from '../src/utils/format.js'
import { blockedKeyMessage, numericText, usdNotice } from '../src/utils/validation.js'

test('USD text keeps digits and one decimal point', () => {
  assert.equal(numericText('12a.3.4$'), '12.34')
  assert.equal(numericText(''), '')
  assert.equal(numericText('0'), '0')
  assert.equal(numericText('-5'), '5')
  assert.equal(blockedKeyMessage('-5'), 'Amounts cannot be negative.')
  assert.equal(blockedKeyMessage('a'), 'Use digits and one decimal point.')
})

test('an empty USD amount is quiet and zero asks for more', () => {
  assert.equal(usdNotice(''), '')
  assert.equal(usdNotice('0'), 'Enter an amount greater than zero.')
  assert.equal(usdNotice('10.50'), '')
  assert.equal(usdNotice('10.'), '')
  assert.equal(usdNotice('0.001'), '')
  assert.equal(usdNotice('.'), 'Enter a number.')
  assert.equal(formatAmount('0.001'), '0.001')
  assert.equal(formatAmount('10.50'), '10.50')
  assert.equal(formatAmount('1000000000'), '1,000,000,000.00')
})

test('each coin is the USD share times its rate', () => {
  assert.equal(coinAmount('100', 70, '0.00002'), '0.0014')
  assert.equal(coinAmount('100', 30, '2'), '60')
})

test('an empty amount or a missing rate buys no coin', () => {
  assert.equal(coinAmount('', 70, '0.00002'), '0')
  assert.equal(coinAmount('100', 70, undefined), '0')
})

test('a coin amount uses grouping and at most eight decimal places', () => {
  assert.equal(formatAmount('1234.5', 'BTC'), '1,234.50')
  assert.equal(formatAmount('0.123456789', 'ETH'), '0.12345679')
})
