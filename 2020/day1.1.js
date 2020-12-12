const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  const solution = (function () {
    for (const perm of permutation(input, 2)) {
      const [x, y] = perm;
      if (x + y === 2020) {
        return x * y;
      }
    }
  }());
  assert.equal(solution, 1010884);
  console.log('Final Answer:', solution);
};
