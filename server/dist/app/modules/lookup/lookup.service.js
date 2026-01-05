"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countries_json_1 = __importDefault(require("../../../data/iso/countries.json"));
const languages_json_1 = __importDefault(require("../../../data/iso/languages.json"));
const currencies_json_1 = __importDefault(require("../../../data/iso/currencies.json"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const normalize = (value) => value.toLowerCase().trim();
class LookupService {
    static searchCountries(search) {
        if (!search)
            return countries_json_1.default;
        const q = normalize(search);
        return countries_json_1.default.filter((c) => normalize(c.name).includes(q) ||
            normalize(c.alpha2).includes(q) ||
            normalize(c.alpha3).includes(q));
    }
    static searchLanguages(search) {
        if (!search)
            return languages_json_1.default;
        const q = normalize(search);
        return languages_json_1.default.filter((l) => normalize(l.name).includes(q) ||
            normalize(l.nativeName).includes(q) ||
            normalize(l.code).includes(q));
    }
    static searchCurrencies(search) {
        if (!search)
            return currencies_json_1.default;
        const q = normalize(search);
        return currencies_json_1.default.filter((c) => normalize(c.name).includes(q) || normalize(c.code).includes(q));
    }
    static searchBanks(countryCode, search) {
        const filePath = path_1.default.join(process.cwd(), "src/data/banks", `banks.${countryCode}.json`);
        if (!fs_1.default.existsSync(filePath))
            return [];
        const banks = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        if (!search)
            return banks;
        const q = normalize(search);
        return banks.filter((b) => normalize(b.name).includes(q) || normalize(b.code).includes(q));
    }
}
exports.default = LookupService;
