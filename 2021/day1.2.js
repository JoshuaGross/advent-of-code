const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  const solution = (function () {
    let prev = [input.shift(), input.shift(), input.shift()];
    let res = 0;
    for (const x of input) {
      const prevSum = prev.reduce((x, acc) => x+acc, 0);
      prev.shift();
      prev.push(x);
      const sum = prev.reduce((x, acc) => x+acc, 0);
      if (sum > prevSum) {
        res++;
      }
    }
    return res;
  }());
  console.log('Final Answer:', solution);
};
