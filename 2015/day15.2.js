const fs = require('fs');
const assert = require('assert');
const { sum, product } = require('../utils');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => {
    const [name, attributes_] = line.split(': ');
    const attributes = attributes_.split(', ').reduce((map, attr) => {
      const [name, value] = attr.split(' ');
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

function getScoreOfKeys(input, combination, keys) {
  const attrMap = {};
  const attrs = keys;
  attrs.forEach(k => attrMap[k] = 0);

  combination.forEach((num, i) => {
    attrs.forEach(attr => {
      attrMap[attr] += input[i][1][attr] * num;
    });
  });

  const finalProduct = product(...attrs.map(a => Math.max(attrMap[a], 0)));

  return finalProduct;
}

function getScore(input, combination) {
  return getScoreOfKeys(input, combination, Object.keys(input[0][1]).filter(a => a !== 'calories'));
}

function getCalories (input, combination) {
  return getScoreOfKeys(input, combination, ['calories']);
}

function getOptimalMix (input) {
  const names = input.map(x => x[0]);
  const allCombinations = [...combinations(100, 100, ...names)];
  allCombinations.forEach(c => assert.equal(sum(...c), 100));

  let maxScore = 0;
  let maxCombo = null;
  for (const c of allCombinations) {
    const score = getScore(input, c);
    const calories = getCalories(input, c);
    if (score > maxScore && calories === 500) {
      maxScore = score;
      maxCombo = c;
    }
  }

  return [maxScore, maxCombo];
}

module.exports = function runner(inputFile, verbose) {
  let input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const [solution, __] = getOptimalMix(input);

  assert.equal(solution, 117936);
  console.log('Final Answer:', solution);
}
