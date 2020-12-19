const fs = require('fs');
const assert = require('assert');
const { sum, product } = require('../utils');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => {
    const [name, attributes_] = line.split(': ');
    const attributes = attributes_.split(', ').reduce((map, attr) => {
      const [name, value] = attr.split(' ');
      if (name === 'calories') {
        return map;
      }
      map[name] = parseInt(value, 10);
      return map;
    }, {});
    return [name, attributes];
  }).filter(x => !!x);
}

function* combinations (max, remaining, name, ...names) {
  if (!name) {
    yield [];
    return;
  }
  if (names.length === 0) {
    yield [remaining];
    return;
  }
  for (let i = 0; i < remaining; i++) {
    for (const c of combinations(max, remaining - i, ...names)) {
      yield [i].concat(c);
    }
  }
}

function getScore(input, combination) {
  const attrMap = {};
  const attrs = Object.keys(input[0][1]);
  attrs.forEach(k => attrMap[k] = 0);

  combination.forEach((num, i) => {
    attrs.forEach(attr => {
      attrMap[attr] += input[i][1][attr] * num;
    });
  });

  const finalProduct = product(...attrs.map(a => Math.max(attrMap[a], 0)));

  return finalProduct;
}

function getOptimalMix (input) {
  const names = input.map(x => x[0]);
  const allCombinations = [...combinations(100, 100, ...names)];
  allCombinations.forEach(c => assert.equal(sum(...c), 100));

  let maxScore = 0;
  let maxCombo = null;
  for (const c of allCombinations) {
    const score = getScore(input, c);
    if (score > maxScore) {
      maxScore = score;
      maxCombo = c;
    }
  }

  return [maxScore, maxCombo];
}

module.exports = function runner(inputFile, verbose) {
  const testInput = [
    [
      'Butterscotch',
      { capacity: -1, durability: -2, flavor: 6, texture: 3 }
    ],
    [
      'Cinnamon',
      { capacity: 2, durability: 3, flavor: -2, texture: -1 }
    ]
  ];
  const [testSolution, _] = getOptimalMix(testInput);
  assert.equal(testSolution, 62842880);

  let input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const [solution, __] = getOptimalMix(input);

  assert.equal(solution, 222870);
  console.log('Final Answer:', solution);
}
