const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  const solution = (function () {
    let prev = Infinity;
    let res = 0;
    for (const x of input) {
      if (x > prev) {
        res++;
      }
      prev = x;
    }
    return res;
  }());
  console.log('Final Answer:', solution);
};
