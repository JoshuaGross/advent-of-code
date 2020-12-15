const fs = require('fs');
const assert = require('assert');
const lookAndSay = require('../utils/lookAndSay');

module.exports = function runner(inputFile, verbose) {
  assert.equal(lookAndSay(1), 11);
  assert.equal(lookAndSay(11), 21);
  assert.equal(lookAndSay(21), 1211);
  assert.equal(lookAndSay(1211), 111221);
  assert.equal(lookAndSay(111221), 312211);

  let num = BigInt(1113222113);
  for (let i = 0; i < 40; i++) {
    num = lookAndSay(num);
  }

  const solution = num.toString().length;
  assert.equal(solution, 252594);
  console.log('Final Answer:', solution);
}
