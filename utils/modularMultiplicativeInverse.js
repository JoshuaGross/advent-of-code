// Both params must be BigInt.
// Basic, naive mmi.
// Find modular inverse of a under modulo m.
module.exports = function modularMultiplicativeInverse (a, m) {
  const b = BigInt(a % m);

  // We brute force the search for the smaller n, as we
  // know that the number must exist between the current given modulus and 1
  for (let n = 1n; n <= m; n++) {
    if ((b * n) % m == 1n) return n;
  }

  // 1 is acceptable if we don't find another solution
  return 1n;
}
