const fs = require('fs');
const assert = require('assert');

function powerset(input) {
  return (function ps(list) {
    if (list.length === 0) {
      return [[]];
    }
    var head = list.pop();
    var tailPS = ps(list);
    return tailPS.concat(tailPS.map(function(e) { return [head].concat(e); }));
  })(input.slice());
}

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

function copyAry (ary) {
  return ary.join('').split('');
}

function reverse (ary) {
  return copyAry(ary).reverse();
}

function applyMask(mask, input) {
  assert.equal(typeof input, 'number');
  const inputModified = input.toString(2).split('').reverse();
  //console.log('mask 1', mask, reverse(inputModified).join(''));
  const alts = [];
  while (inputModified.length < 36) {
    inputModified.push('0');
  }
  for (let i = 0; i < mask.length; i++) {
    const ch = mask[i];
    if (ch === '1') {
      inputModified[i] = '1';
    } else if (ch === 'X') {
      inputModified[i] = '0';
      alts.push(i);
    }
  }

  function setPositionsOn (str, positions) {
    for (const pos of positions) {
      str[pos] = '1';
    }
    return str;
  }

  const altsPowerset = powerset(alts);
  return altsPowerset.map(p => parseInt(reverse(setPositionsOn(copyAry(inputModified), p)).join(''), 2));
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
    const lhsAlts = applyMask(mask, lhs);
    lhsAlts.forEach(lhsAlt => {
      registers[lhsAlt] = rhs;
    });
  }

  return Object.keys(registers).reduce((acc, key) => acc + registers[key], 0);
}

module.exports = function runner(inputFile) {
  const testInput = parseInput(`
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`);
  assert.equal(sumResults(testInput), 208);

  const inputLines = parseInput(fs.readFileSync(inputFile, 'utf8'));

  console.log(inputLines);
  const solution = sumResults(inputLines);

  assert.equal(solution, 2667858637669);
  console.log('Final Answer:', solution);
}


