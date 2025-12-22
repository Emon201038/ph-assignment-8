import countries from "../../../data/iso/countries.json";
import languages from "../../../data/iso/languages.json";
import currencies from "../../../data/iso/currencies.json";
import path from "path";
import fs from "fs";

const normalize = (value: string) => value.toLowerCase().trim();

class LookupService {
  static searchCountries(search?: string) {
    if (!search) return countries;

    const q = normalize(search);

    return countries.filter(
      (c) =>
        normalize(c.name).includes(q) ||
        normalize(c.alpha2).includes(q) ||
        normalize(c.alpha3).includes(q)
    );
  }

  static searchLanguages(search?: string) {
    if (!search) return languages;

    const q = normalize(search);

    return languages.filter(
      (l) =>
        normalize(l.name).includes(q) ||
        normalize(l.nativeName).includes(q) ||
        normalize(l.code).includes(q)
    );
  }

  static searchCurrencies(search?: string) {
    if (!search) return currencies;

    const q = normalize(search);

    return currencies.filter(
      (c) => normalize(c.name).includes(q) || normalize(c.code).includes(q)
    );
  }

  static searchBanks(countryCode: string, search?: string) {
    const filePath = path.join(
      process.cwd(),
      "src/data/banks",
      `banks.${countryCode}.json`
    );

    if (!fs.existsSync(filePath)) return [];

    const banks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!search) return banks;

    const q = normalize(search);

    return banks.filter(
      (b: any) => normalize(b.name).includes(q) || normalize(b.code).includes(q)
    );
  }
}

export default LookupService;
