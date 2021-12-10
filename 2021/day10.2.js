const fs = require('fs');
const assert = require('assert');
const permutation = require('../utils/permutation');

function validateParens (str, onFailure) {
  let stack = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const last = stack[stack.length - 1];
    if ((ch === ']' && last === '[') || (ch === '>' && last === '<') || (ch === '}' && last === '{') || (ch === ')' && last === '(')) {
      const tmp = stack.split('');
      tmp.splice(-1, 1);
      stack = tmp.join('');
      continue;
      // console.log('after', ch, stack, tmp);
    } else if (ch === ']' || ch === '}' || ch === '>' || ch === ')') {
      // onFailure(ch, stack);
      // console.log('fail', ch, stack);
      return false;
    }

    // console.log('after', ch, stack);
    stack += ch;
  }

  return true;
}

function reduceParens (str) {
  let stack = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const last = stack[stack.length - 1];
    if ((ch === ']' && last === '[') || (ch === '>' && last === '<') || (ch === '}' && last === '{') || (ch === ')' && last === '(')) {
      const tmp = stack.split('');
      tmp.splice(-1, 1);
      stack = tmp.join('');
      continue;
    } else if (ch === ']' || ch === '}' || ch === '>' || ch === ')') {
      return stack;
    }

    stack += ch;
  }

  return stack;
}

function completeParens(stack) {
  let cost = 0;

  stack = reduceParens(stack);
  console.log(stack);

  while (stack.length != 0) {
    const i = stack.length - 1;
    const ch = stack[i];

    console.log('before', stack, cost, ch);

    if (ch === '(') { cost *= 5; cost += 1 };
    if (ch === '[') { cost *= 5; cost += 2 };
    if (ch === '{') { cost *= 5; cost += 3 };
    if (ch === '<') { cost *= 5; cost += 4 };

    const tmp = stack.split('');
    tmp.splice(-1, 1);
    stack = tmp.join('');

    stack = reduceParens(stack);
    console.log('after ', stack, cost, ch);
  }
  console.log(stack, cost);

  return cost;
}

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  const solution = (function () {
    let err = 0;
    let errTable = {};
    const validParens = input.filter((x) => validateParens(x, (ch, stack) => {
      // console.log('With line', x, 'unexpected', ch, 'stack:', stack);
      errTable[ch] = (errTable[ch] || 0) + 1;
    }));
    console.log(validParens, err, errTable);

    const scores = validParens.map((x) => completeParens(x));
    scores.sort((x, y) => x - y);
    console.log(scores, Math.floor(scores.length / 2));
    return scores[Math.floor(scores.length / 2)];

  }());

  console.log('Final Answer: foo ', solution);
};
