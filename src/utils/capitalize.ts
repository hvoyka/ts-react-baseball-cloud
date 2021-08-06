export const capitalize = (word: string) => {
  return word.replace(/\b\w/g, (l) => l.toUpperCase());
};
