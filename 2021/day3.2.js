const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map((x) => {
    return x;
  });

  const solution = (function () {
    const oxGenRatingNum = (function (input) {
      let pos = 0;
      while (input.length > 1) {
        const len = input.length;
        const zeroCount = input.reduce((acc,x) => {
          return acc + (x[pos] === '0' ? 1 : 0);
        }, 0);
        const desiredBitValue = zeroCount > Math.floor(len / 2) ? '0' : '1';
        input = input.filter(num => {
          return num[pos] === desiredBitValue;
        });
        pos++;
        console.log(input, pos);
      }
      assert(input.length === 1);
      return input;
    }(input))[0];
    const co2ScrubberNum = (function (input) {
      let pos = 0;
      while (input.length > 1) {
        const len = input.length;
        const zeroCount = input.reduce((acc,x) => {
          return acc + (x[pos] === '0' ? 1 : 0);
        }, 0);
        const desiredBitValue = zeroCount <= Math.floor(len / 2) ? '0' : '1';
        input = input.filter(num => {
          return num[pos] === desiredBitValue;
        });
        pos++;
        console.log(input, pos);
      }
      assert(input.length === 1);
      return input;
    }(input))[0];
    console.log(oxGenRatingNum, co2ScrubberNum);
    const lifeSupportRating = parseInt(oxGenRatingNum, 2) * parseInt(co2ScrubberNum, 2);
    return lifeSupportRating;
  }());
  console.log('Final Answer:', solution);
};
