const fs = require('fs');
const assert = require('assert');

function isNice (str) {
  if (str.match(/ab|cd|pq|xy/)) {
    return false;
  }

  let vowels = str.split('').filter(ch => 'aeiou'.indexOf(ch) !== -1).length;
  let doubles = str.match(/([a-zA-Z])\1/);

  return vowels >= 3 && !!doubles;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  assert.equal(isNice('ugknbfddgicrmopn'), true);
  assert.equal(isNice('aaa'), true);
  assert.equal(isNice('jchzalrnumimnmhp'), false);
  assert.equal(isNice('haegwjzuvuyypxyu'), false);
  assert.equal(isNice('dvszwmarrgswjxmb'), false);

  const numNice = inputLines.filter(isNice).length;

  const solution = numNice;
  assert.equal(solution, 238);
  console.log('Final Answer:', solution);
}
