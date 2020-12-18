const fs = require('fs');
const assert = require('assert');
const sum = require('../utils/sum');

function tokenize (str) {
  const tokens = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i].match(/[0-9]/)) {
      let tmp = '';
      while (str[i] && str[i].match(/[0-9]/)) {
        tmp += str[i++];
      }
      tokens.push(parseInt(tmp, 10));
    }
    if (str[i] && str[i].match(/[\(\)\+\-\*\/]/)) {
      tokens.push(str[i]);
    }
  }
  return tokens;
}

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => tokenize(line));
}

function evaluateNumber (expr, i = 0, level = 0) {
  if (typeof expr[i] === 'number') {
    return [i + 1, expr[i]];
  }

  if (expr[i] === '(') {
    return evaluateExpr(expr, i + 1, level + 1);
  }

  throw new Error('foo');
}

function evaluateExpr (expr, i = 0, level = 0) {
  let value;
  [i, value] = evaluateNumber(expr, i, level);

  while (expr[i] != null && expr[i] != ')') {
    const op = expr[i++];
    let num;
    [i, num] = evaluateNumber(expr, i, level);

    if (op === '+') {
      value = value + num;
    } else if (op === '-') {
      value = value - num;
    } else if (op === '*') {
      value = value * num;
    } else if (op === '/') {
      value = value / num;
    }
  }

  assert.equal(expr[i] == null || expr[i] === ')', true);
  return [i + 1, value];
}

module.exports = function runner(inputFile, verbose) {
  let input = parseInput(fs.readFileSync(inputFile, 'utf8'), 3);
  const values = input.map(line => evaluateExpr(line)[1]);

  const solution = sum(...values);

  assert.equal(solution, 9535936849815);
  console.log('Final Answer:', solution);
}
