const fs = require('fs');
const assert = require('assert');
const tsp = require('../utils/tsp');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => {
    const [lhs, rhs] = line.split(' = ');
    const [city1, city2] = lhs.split(' to ');
    return [city1, city2, parseInt(rhs, 10)];
  });
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = parseInput(fs.readFileSync(inputFile, 'utf8'));

  const solution = tsp(inputLines)[0];
  assert.equal(solution, 251);
  console.log('Final Answer:', solution);
}
