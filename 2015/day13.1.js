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
  const sampleInput = parseInput(`Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`);
  assert.equal(tsp(sampleInput, Number.MIN_SAFE_INTEGER, ((a, b) => a > b), false, true)[0], 330)

  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));

  const solution = tsp(input, Number.MIN_SAFE_INTEGER, ((a, b) => a > b), false, true)[0];
  assert.equal(solution, 664);
  console.log('Final Answer:', solution);
}
