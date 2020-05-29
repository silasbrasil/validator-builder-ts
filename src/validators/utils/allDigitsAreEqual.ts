export const allDigitsAreEqual = (digits: string): boolean => {
  for (let i = 0; i < 10; i++) {
    if (digits === Array(digits.length + 1).join(String(i))) {
      return true
    }
  }

  return false
}