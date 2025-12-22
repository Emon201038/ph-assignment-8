const ISO6391 = require("iso-639-1");
const fs = require("fs");

const languages = ISO6391.getAllCodes().map((code) => ({
  code,
  name: ISO6391.getName(code),
  nativeName: ISO6391.getNativeName(code),
}));

fs.writeFileSync(
  "src/data/iso/languages.json",
  JSON.stringify(languages, null, 2)
);
