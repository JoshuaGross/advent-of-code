const fs = require('fs');
const assert = require('assert');
const { sum } = require('../utils');

function parseInput(str) {
  const decks = str.split('\n\n').filter(x => !!x).map(line => {
    return line.split('\n').filter(x => !!x).slice(1).map(x => parseInt(x, 10));
  });
  return decks;
}

function arraysEqual (a, b) {
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (!Array.isArray(a)) {
    return a === b;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!arraysEqual(a[i], b[i])) {
      return false;
    }
  }
  return true;
}

function any (a) {
  return a.reduce((acc, x) => acc || x, false);
}

function playCombatRound(decks, deckHistory, gameNum) {
  assert.equal(decks.length, 2);
  const [a, b] = decks;

  const singleHand = [...a, 'x', ...b];
  if (any(deckHistory.map(history => arraysEqual(history, singleHand)))) {
    while (b.length > 0) {
      a.push(b.shift());
    }
    return true;
  }
  deckHistory.push(singleHand);
  
  const topA = a.shift();
  const topB = b.shift();
  let res;

  // IsRecursive?
  if (topA <= a.length && topB <= b.length) {
    const input = [[...a.slice(0, topA)], [...b.slice(0, topB)]];
    res = playRecursiveGame(input, gameNum + 1);
  } else {
    res = topA > topB;
  }

  if (res) {
    a.push(topA);
    a.push(topB);
  } else {
    b.push(topB);
    b.push(topA);
  }
  return res;
}

function playRecursiveGame (input, gameNum = 1) {
  const deckHistory = [];
  let round = 1;
  let winner;
  while (input[0].length !== 0 && input[1].length !== 0) {
    //console.log(`Game ${gameNum}, round ${round}`);
    winner = playCombatRound(input, deckHistory, gameNum);
    round++;
  }
  return winner;
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const winner = playRecursiveGame(input);
  const winningHand = winner ? input[0] : input[1];

  const len = winningHand.length;
  const solution = sum(...winningHand.map((num, i) => num * (len - i)));

  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}
