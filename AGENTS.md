# Asset allocation calculator

Vue 3 app for a Justworks associate front-end assessment. The author is a junior software engineer. The code should stay simple enough to study and to explain out loud: the components, the split math, and the CSS.

A USD amount is split between BTC and ETH. The split starts at 70/30 and can be changed. The result is how much of each coin to buy. Coinbase returns how much coin one dollar buys, so coin amount = USD share × rate. ETH is whatever is left after the BTC share.

Plan on about half a day to a day of work. The README should say what was built, how to run it, a few decisions, what was left out, and where AI was used.

## How to write the code

JavaScript only. Vue files use `<script setup>`. No TypeScript and no new libraries.

Prefer a straight function over a new layer. Name things with the words already on the page. Do not add comments for study. A separate study doc comes later.

`coinAmount` is the split. The card calls it. Do not fold that formula back into the component.

Tests stay in `test/logic.test.js` and run with `npm test`, which is Node's built-in runner. They cover the split, USD parsing, and coin formatting. Do not add a test library, component snapshots, or a larger suite. Local imports in files that Node loads need a `.js` extension. Vue imports stay as they are.

`SliderCard.vue` uses double quotes and semicolons. Other files use single quotes and no semicolons. Keep that split. `defineModel` is already in use. Keep it only where it can be explained.

Do not copy code, file names, or the sample structure from the hiring-manager guide. That guide is a checklist of behavior, not a template.

## How the page works

- Styles live in `src/styles/tokens.css`. Do not add `<style>` blocks. Use the color variables already there.
- `UsdInput` keeps the typed string. Digits and one decimal point only. Empty and `0` stay different.
- The slider is the BTC share and starts at 70. The number under the thumb is that share. ETH is 100 minus the BTC share.
- BTC and ETH are read-only cards. The title sits above the amount. The card fades from dark green to lighter green, with white text. Those coin amounts are the main numbers.
- The USD label, Reset, and Refresh Rates use the coin cards' corner radius, white text, and a flat green. The coin cards keep the fade.
- `RefreshRates` reloads the rates. A failed refresh keeps the last good pair and says the results may be using previous rates. `ResetButton` sets USD back to 0 and the split back to 70/30.
- When field errors should appear is not decided yet. Do not invent that timing.
- The layout should stay usable on a phone. Do not hide the slider to make it fit.
- Labels point at their fields. A keyboard user can reach the slider and both buttons.

## Rates

`loadExchangeRates` is the only rate function. It reads `https://api.coinbase.com/v2/exchange-rates?currency=USD` and stores the pair. Show formatted amounts, not the raw rate.

## After a change

Load the page and use the control that changed. If the split, USD parsing, or coin formatting changed, run `npm test`. Do not commit unless asked.

Add a row to `AI-logs.md` for each prompt. Record the prompt, what was produced, and any edit the author made.
