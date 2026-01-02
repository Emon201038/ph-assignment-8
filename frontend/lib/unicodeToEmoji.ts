// Converts "U+1F1FA" or "U+1F1FA U+1F1F8" to the actual emoji
export const unicodeToEmoji = (unicodeStr: string) => {
  // Split by space, remove "U+" and convert to numbers
  const codePoints = unicodeStr
    .split(" ")
    .map((u) => parseInt(u.replace("U+", ""), 16));
  return String.fromCodePoint(...codePoints);
};
