const modularMultiplicativeInverse = require('./modularMultiplicativeInverse');

// congruences:
// [ [mod, rem], ... ]
// All numeric arguments must be BigInt.
module.exports = function crt (congruences) {
  const prod = congruences.reduce((acc, [mod,_]) => acc * mod, 1n);

  return congruences.reduce((sum, [mod, rem]) => {
    const p = prod / mod;
    return sum + (rem * modularMultiplicativeInverse(p, mod) * p);
  }, 0n) % prod;
}

