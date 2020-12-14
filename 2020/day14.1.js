const fs = require('fs');
const assert = require('assert');

function parseInput (txt) {
  const lines = txt.split('\n').filter(x => !!x);
  return lines.map(line => {
    const parts = line.split(' = ');
    if (parts[0] === 'mask') {
      return { mask: parts[1].split('').reverse().join('') };
    }
    const lhs = parseInt(parts[0].replace('mem[', '').replace(']', ''), 10);
    const rhs = parseInt(parts[1], 10);
    return { lhs, rhs };
  });
}

function applyMask(mask, input) {
  const inputModified = input.toString(2).split('').reverse();
  for (let i = 0; i < mask.length; i++) {
    const ch = mask[i];
    if (ch !== 'X') {
      inputModified[i] = (ch === '0' ? '0' : '1');
    } else if (inputModified.length <= i) {
      inputModified[i] = '0';
    }
  }

  return parseInt(inputModified.reverse().join(''), 2);
}

function sumResults (input) {
  let registers = {};
  let mask = '';

  for (const line of input) {
    if (line.mask) {
      mask = line.mask;
      continue;
    }
    const { rhs, lhs } = line;
    registers[lhs] = applyMask(mask, rhs);
  }

  return Object.keys(registers).reduce((acc, key) => acc + registers[key], 0);
}

module.exports = function runner(inputFile) {
  const testInput = parseInput(`
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`);
  assert.equal(sumResults(testInput), 165);

  const inputLines = parseInput(fs.readFileSync(inputFile, 'utf8'));

  console.log(inputLines);
  const solution = sumResults(inputLines);

  assert.equal(solution, 8471403462063);
  console.log('Final Answer:', solution);
}

