const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  const solution = (function () {
    for (const perm of permutation(input, 3)) {
      const [x, y, z] = perm;
      if (x + y + z === 2020) {
        return x * y * z;
      }
    }
  }());

  assert.equal(solution, 253928438);
  console.log('Final Answer:', solution);
};

