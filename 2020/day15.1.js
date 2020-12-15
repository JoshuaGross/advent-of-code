const fs = require('fs');
const assert = require('assert');

function parseInput (txt) {
  return txt.split(',');
}

function nextNumberSpoken (seq, num, index, lookup) {
  let prevIndex;
  if (lookup[num] != null) {
    prevIndex = lookup[num];
    lookup[num] = index;
  } else {
    prevIndex = seq.lastIndexOf(num, index - 1);
    lookup[num] = index;
  }
  return prevIndex === -1 ? 0 : index - prevIndex;
}

module.exports = function runner(inputFile) {
  const lookupTmp = {};
  assert.equal(nextNumberSpoken([0,3,6], 6, 2, lookupTmp), 0);
  assert.equal(nextNumberSpoken([0,3,6,0], 0, 3, lookupTmp), 3);
  assert.equal(nextNumberSpoken([0,3,6,0,3], 3, 4, lookupTmp), 3);
  assert.equal(nextNumberSpoken([0,3,6,0,3,3], 3, 5, lookupTmp), 1);
  assert.equal(nextNumberSpoken([0,3,6,0,3,3,1], 1, 6, lookupTmp), 0);
  assert.equal(nextNumberSpoken([0,3,6,0,3,3,1,0], 0, 7, lookupTmp), 4);
  assert.equal(nextNumberSpoken([0,3,6,0,3,3,1,0,4], 4, 8, lookupTmp), 0);

  const inputLines = '1,0,16,5,17,4'.split(',').map(x => parseInt(x, 10));// parseInput(fs.readFileSync(inputFile, 'utf8'));

  let seq = inputLines, index = seq.length - 1, n = seq[index], lookup = {};
  while (index < 2020 - 1) {
    const prevN = n;
    n = nextNumberSpoken(seq, n, index++, lookup);
  }

  assert.equal(n, 1294);

  while (index < 300000000 - 1) {
    n = nextNumberSpoken(seq, n, index++, lookup);
    if (index % 1000000 === 1) console.log(new Date(), index, n, Object.keys(lookup).length);
  }

  //console.log(seq);
  const solution = n;
  assert.equal(solution, 573522);
  console.log('Final Answer:', solution);
}
