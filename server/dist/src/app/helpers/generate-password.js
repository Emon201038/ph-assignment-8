"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStrongPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateStrongPassword = (length = 6) => {
    if (length < 8) {
        throw new Error("Password length must be at least 8 characters");
    }
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const all = upper + lower + numbers + symbols;
    let password = [
        upper[crypto_1.default.randomInt(upper.length)],
        lower[crypto_1.default.randomInt(lower.length)],
        numbers[crypto_1.default.randomInt(numbers.length)],
        symbols[crypto_1.default.randomInt(symbols.length)],
    ];
    for (let i = password.length; i < length; i++) {
        password.push(all[crypto_1.default.randomInt(all.length)]);
    }
    return password.sort(() => Math.random() - 0.5).join("");
};
exports.generateStrongPassword = generateStrongPassword;
