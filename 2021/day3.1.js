const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map((x) => {
    return x.split('');
  });

  const solution = (function () {
    let gamma = '', epsilon = '';
    console.log(input);
    for (let position = 0; position < input[0].length; position++) {
      let num0 = 0, num1 = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i][position] === '0') {
          num0++;
        } else {
          num1++;
        }
      }

      gamma += num0 > num1 ? '0' : '1';
      epsilon += num0 > num1 ? '1' : '0';
      console.log(gamma, epsilon);
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  }());
  console.log('Final Answer:', solution);
};
