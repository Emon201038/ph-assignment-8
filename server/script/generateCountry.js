// scripts/generateCountries.ts
const countries = require("world-countries");
const fs = require("fs");

const data = countries.map((c) => ({
  name: c.name.common,
  alpha2: c.cca2,
  alpha3: c.cca3,
  numeric: c.ccn3,
}));

fs.writeFileSync("src/data/iso/countries.json", JSON.stringify(data, null, 2));
