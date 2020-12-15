const fs = require('fs');
const assert = require('assert');
const tsp = require('../utils/tsp');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => {
    const match = line.match(/^([A-Za-z]+) would (gain|lose) ([0-9]+) happiness units by sitting next to ([A-Za-z]+)\.$/);
    const multiplier = match[2] === 'gain' ? 1 : -1;
    return [match[1], match[4], parseInt(match[3], 10) * multiplier];
  });
}

module.exports = function runner(inputFile, verbose) {
  const input_ = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const names = new Array(...(new Set(input_.map(x => x[0]))).values());
  const input = names.reduce((a, name) => a.concat([['Myself', name, 0], [name, 'Myself', 0]]), input_);

  const solution = tsp(input, Number.MIN_SAFE_INTEGER, ((a, b) => a > b), false, true)[0];
  assert.equal(solution, 640);
  console.log('Final Answer:', solution);
}
