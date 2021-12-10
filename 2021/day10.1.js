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
      console.log('after', ch, stack, tmp);
      continue;
    } else if (ch === ']' || ch === '}' || ch === '>' || ch === ')') {
      onFailure(ch, stack);
      return false;
    }

    console.log('after', ch, stack);
    stack += ch;
  }

  return stack.length === 0;
}

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  const solution = (function () {
    let err = 0;
    let errTable = {};
    const validParens = input.filter((x) => validateParens(x, (ch, stack) => {
      console.log('With line', x, 'unexpected', ch, 'stack:', stack);
      errTable[ch] = (errTable[ch] || 0) + 1;
      if (ch === ')') err += 3;
      if (ch === ']') err += 57;
      if (ch === '}') err += 1197;
      if (ch === '>') err += 25137;
    }));
    console.log(validParens, err, errTable);
    return err;
  }());

  console.log('Final Answer:', solution);
};
