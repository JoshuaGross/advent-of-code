const fs = require('fs');
const assert = require('assert');

function hasDoubledCharsTwice (str) {
  for (let i = 0; i < str.length - 1; i++) {
    let strWindow = str.slice(i, i+2);
    if (str.lastIndexOf(strWindow) > i+1) {
      return true;
    }
  }

  return false;
}

function isNice (str) {
  if (!hasDoubledCharsTwice(str)) {
    return false;
  }

  for (let i = 0; i < str.length - 2; i++) {
    if (str[i + 2] === str[i]) {
      return true;
    }
  }

  return false;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  assert.equal(isNice('qjhvhtzxzqqjkmpb'), true);
  assert.equal(isNice('xxyxx'), true);
  assert.equal(isNice('uurcxstgmygtbstg'), false);
  assert.equal(isNice('ieodomkazucvgmuy'), false);

  const numNice = inputLines.filter(isNice).length;

  const solution = numNice;
  assert.equal(solution, 69);
  console.log('Final Answer:', solution);
}
