# Asset allocation calculator

A Vue 3 page that splits a USD amount between BTC and ETH. You enter dollars, set the BTC share with a slider, and the page shows how much of each coin to buy. ETH is whatever is left after the BTC share.

## How to run

Install dependencies, then start the dev server:

```bash
npm install
npm run dev
```

Vite prints a local URL. Open that in a browser.

`npm run build` writes the production files to `dist`. `npm run preview` serves that build. `npm test` runs the logic tests. `npm run lint` checks the JavaScript. `npm run fmt` formats it.

## What was built

The page title is “Asset allocation calculator.” One card holds the controls. Rates load when the card opens.

- **USD.** The field keeps the text you type. Digits and one decimal point stay. An empty field shows no message. `0` stays `0` and asks for an amount greater than zero. A letter or a minus sign is blocked and gets a short message. After you leave the field, the typed text is unchanged. Amounts of at least one cent show with thousands separators and two decimal places. A smaller amount, such as `0.001`, stays visible. A dollar sign sits beside the number.
- **Slider.** The slider is the BTC share. It starts at 70 and moves from 0 to 100 in steps of 1. The current number sits under the thumb. ETH’s share is 100 minus that number.
- **Circle.** Under the slider, a ring shows the BTC share in dark green and the rest in lighter green. The center is open: BTC and ETH, with each percentage under its name. The ring follows the slider.
- **BTC and ETH.** These are read-only cards. The name sits above the amount. The coin amount is the largest number. Under it is the dollar share, then the price of one coin. ETH's dollars are whatever is left after BTC, so the two shares add back to the amount typed. Each card fades from dark green to lighter green, with white text. Coinbase returns how much coin one dollar buys, so the coin amount is that dollar share times the rate. A small coin amount shows five decimals, a larger one four, and 100 or more shows two. A long amount shrinks so it stays inside the field.
- **Refresh Rates.** Loads the rates again. Until the first pair arrives, BTC and ETH say Loading instead of showing zero. If that load fails and there is no saved pair, the card says “Could not load live prices. Try again.” A later failed refresh keeps the last good pair, and the card says “Current results may be using the previous rates.” Under the button, the line reads “Updated just now, may be stale,” then counts minutes and still says the prices may be stale.
- **Reset.** Clears the USD amount and sets the split back to 70/30. The empty field shows `0.00` as a placeholder.

The USD label, Reset, and Refresh Rates use the coin cards' rounded corners, in a flat green with white text.

On a window narrower than 640px, the card padding tightens and BTC and ETH stack. The USD amount, the circle, and Reset stay readable. The slider stays on the page.

Labels point at their fields. The slider and both buttons can be reached from the keyboard. A hidden line repeats the BTC and ETH results for a screen reader, and updates when those results change. The page stays in a light color scheme, so a dark system theme does not restyle the controls.

## Decisions

- JavaScript only. Vue files use `<script setup>`. Vue is the only runtime dependency. Vite, ESLint, and oxfmt are for development.
- `loadExchangeRates` is the only rate function. It reads `https://api.coinbase.com/v2/exchange-rates?currency=USD` and stores the BTC and ETH pair in `localStorage`. A later failed pull can reuse that pair. The page shows formatted coin amounts, not the raw rate.
- Styles live in `src/styles/tokens.css`. Colors come from the variables at the top of that file.
- `defineModel` connects the USD field, the slider, and the two coin amounts to the card.
- `splitUsd` gives the dollar shares. ETH's dollars are the remainder after BTC. `coinAmount` multiplies a dollar share by its rate. An empty amount or a missing rate is 0 coin.
- Coin amounts use five decimals under 1, four under 100, and two from 100 up. After you leave USD, amounts of at least one cent use two decimal places. A smaller amount stays visible.
- `npm test` uses Node's built-in test runner. The five tests in `test/logic.test.js` cover the split, USD parsing, and coin formatting. No test library was added.

## Left out

- Component tests were left out.
- The Vite starter files are still in the repo and are not part of the page: `src/components/HelloWorld.vue`, `src/style.css`, and the sample images in `src/assets`. The browser tab title in `index.html` is still `vite-scaffold`.

## Where AI was used

A coding agent wrote most of this project from prompts: the components, the split math, the Coinbase request, the formatting, the CSS, the flat green label and buttons, and the five logic tests. Each prompt is listed in `AI-logs.md`, with what the agent produced and any later edit.

`SliderCard.vue` was edited by hand to use double quotes, semicolons, and a USD default of `"0"`. A change that made the card smaller was undone, because the page still scrolled.
