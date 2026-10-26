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

- **USD.** The field keeps the text you type. Digits and one decimal point stay. An empty field and `0` stay different. After you leave the field, a valid amount shows with thousands separators and two decimal places. A dollar sign sits beside the number.
- **Slider.** The slider is the BTC share. It starts at 70 and moves from 0 to 100 in steps of 1. The current number sits under the thumb. ETH’s share is 100 minus that number.
- **BTC and ETH.** These are read-only cards. The name sits above the amount. Each card fades from dark green to lighter green, with white text. The coin amount is the USD share times the Coinbase rate. Coinbase returns how much coin one dollar buys, so the amount is `dollars × (share / 100) × rate`. A long amount shrinks so it stays inside the field.
- **Refresh Rates.** Loads the rates again. Under the button, “Last updated # minutes ago” counts from the last successful pull. A failed refresh keeps the last good pair, and the card says “Current results may be using the previous rates.” A failed button press also shows “Error refreshing rates” for 3 seconds.
- **Reset.** Sets the USD amount back to 0 and the split back to 70/30.

Labels point at their fields. The slider and both buttons can be reached from the keyboard.

## Decisions

- JavaScript only. Vue files use `<script setup>`. Vue is the only runtime dependency. Vite, ESLint, and oxfmt are for development.
- `loadExchangeRates` is the only rate function. It reads `https://api.coinbase.com/v2/exchange-rates?currency=USD` and stores the BTC and ETH pair in `localStorage`. A later failed pull can reuse that pair. The page shows formatted coin amounts, not the raw rate.
- Styles live in `src/styles/tokens.css`. Colors come from the variables at the top of that file.
- `defineModel` connects the USD field, the slider, and the two coin amounts to the card.
- BTC and ETH use grouping and up to eight decimal places. USD uses two decimal places after the field is left.

## Left out

- When a field error should appear is not decided. The USD field and the amount fields already include an error message for a value that is not a valid number. An empty USD field is allowed.
- The card uses the full width of a narrow screen, and the slider stays on the page. A separate phone layout was not added.
- `npm test` covers the split math, USD parsing, and coin formatting. Component tests were left out.
- The Vite starter files are still in the repo and are not part of the page: `src/components/HelloWorld.vue`, `src/style.css`, and the sample images in `src/assets`. The browser tab title in `index.html` is still `vite-scaffold`.

## Where AI was used

A coding agent wrote most of this project from prompts: the components, the split math, the Coinbase request, the formatting, and the CSS. Each prompt is listed in `AI-logs.md`, with what the agent produced and any later edit.

`SliderCard.vue` was edited by hand to use double quotes, semicolons, and a USD default of `"0"`. A change that made the card smaller was undone, because the page still scrolled.
