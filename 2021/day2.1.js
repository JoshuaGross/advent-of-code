const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map((x) => {
    const parts = x.split(' ');
    return [parts[0], parseInt(parts[1], 10)];
  });

  const solution = (function () {
    let x = 0, y = 0;
    for (const [dir, vel] of input) {
      if (dir === 'up') {
        y -= vel;
      }
      if (dir === 'down') {
        y += vel;
      }
      if (dir === 'forward') {
        x += vel;
      }
      console.log(dir, vel, x, y);
    }
    return x * y;
  }());
  console.log('Final Answer:', solution);
};
