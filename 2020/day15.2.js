const fs = require('fs');
const assert = require('assert');

function parseInput (txt) {
  return txt.split(',');
}

function seqToMap (seq) {
  return new Map(seq.slice(0, -1).map((n, i) => [n, i]));
}

function nextNumberSpoken (num, index, lookup) {
  let res = lookup.has(num) ? index - lookup.get(num) : 0;
  if (typeof num !== 'number' || typeof index !== 'number' || typeof res !== 'number') { console.log(lookup); console.log(num, index, res); }
  lookup.set(num, index);
  return res;
}

module.exports = function runner(inputFile) {
  const lookupTmp = seqToMap([0,3,6]);
  assert.equal(nextNumberSpoken(6, 2, lookupTmp), 0);
  assert.equal(nextNumberSpoken(0, 3, lookupTmp), 3);
  assert.equal(nextNumberSpoken(3, 4, lookupTmp), 3);
  assert.equal(nextNumberSpoken(3, 5, lookupTmp), 1);
  assert.equal(nextNumberSpoken(1, 6, lookupTmp), 0);
  assert.equal(nextNumberSpoken(0, 7, lookupTmp), 4);
  assert.equal(nextNumberSpoken(4, 8, lookupTmp), 0);

  const inputLines = '1,0,16,5,17,4'.split(',').map(x => parseInt(x, 10));

  let seq = inputLines, index = seq.length - 1, n = seq[index], lookup = seqToMap(seq);
  while (index < 2020 - 1) {
    const prevN = n;
    n = nextNumberSpoken(n, index++, lookup);
  }

  assert.equal(n, 1294);

  while (index < 30000000 - 1) {
    n = nextNumberSpoken(n, index++, lookup);
    if (index % 1000000 === 1) console.log(new Date(), index, n, Object.keys(lookup).length);
  }

  const solution = n;
  assert.equal(solution, 573522);
  console.log('Final Answer:', solution);
}
