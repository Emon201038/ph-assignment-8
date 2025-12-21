import crypto from "crypto";

export const generateStrongPassword = (length = 6) => {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters");
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const all = upper + lower + numbers + symbols;

  let password = [
    upper[crypto.randomInt(upper.length)],
    lower[crypto.randomInt(lower.length)],
    numbers[crypto.randomInt(numbers.length)],
    symbols[crypto.randomInt(symbols.length)],
  ];

  for (let i = password.length; i < length; i++) {
    password.push(all[crypto.randomInt(all.length)]);
  }

  return password.sort(() => Math.random() - 0.5).join("");
};
