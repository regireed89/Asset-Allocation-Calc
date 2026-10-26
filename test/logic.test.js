import assert from 'node:assert/strict'
import { test } from 'node:test'
import { coinAmount } from '../src/utils/coinAmount.js'
import { formatAmount } from '../src/utils/format.js'
import { isValid, numericText } from '../src/utils/validation.js'

test('USD text keeps digits and one decimal point', () => {
  assert.equal(numericText('12a.3.4$'), '12.34')
  assert.equal(numericText(''), '')
  assert.equal(numericText('0'), '0')
})

test('an empty USD amount is allowed and a lone decimal is not', () => {
  assert.equal(isValid(''), true)
  assert.equal(isValid('0'), true)
  assert.equal(isValid('10.5'), true)
  assert.equal(isValid('.'), false)
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
