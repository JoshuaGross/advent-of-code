const fs = require('fs');
const assert = require('assert');
const { sum } = require('../utils');

function parseInput(str) {
  const decks = str.split('\n\n').filter(x => !!x).map(line => {
    return line.split('\n').filter(x => !!x).slice(1).map(x => parseInt(x, 10));
  });
  return decks;
}

function playCombatRound(decks) {
  assert.equal(decks.length, 2);
  const [a, b] = decks;
  const topA = a.shift();
  const topB = b.shift();
  if (topA > topB) {
    a.push(topA);
    a.push(topB);
    return true;
  } else {
    b.push(topB);
    b.push(topA);
    return false;
  }
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  while (input[0].length !== 0 && input[1].length !== 0) {
    playCombatRound(input);
    console.log(input);
  }
  const winningHand = input[0].length > 0 ? input[0] : input[1];

  const len = winningHand.length;
  const solution = sum(...winningHand.map((num, i) => num * (len - i)));

  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}
