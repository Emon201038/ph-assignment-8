const currencyCodes = require("currency-codes");
const fs = require("fs");

const currencies = currencyCodes.data.map((c) => ({
  code: c.code,
  name: c.currency,
  number: c.number,
  decimals: c.digits,
}));

fs.writeFileSync(
  "src/data/iso/currencies.json",
  JSON.stringify(currencies, null, 2)
);
