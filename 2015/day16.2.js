const fs = require('fs');
const assert = require('assert');
const { sum, product } = require('../utils');

function parseKeyValueLine (str, parseValue) {
  return str.split(', ').filter(x => !!x).reduce((map, line) => {
    const [key, value] = line.split(': ');
    map[key] = parseValue(value);
    return map;
  }, {});
}

function parseKeyValueLines (str, parseValue) {
  return str.split('\n').filter(x => !!x).reduce((map, line) => {
    const [key, value] = line.split(': ');
    map[key] = parseValue(value);
    return map;
  }, {});
}

function parseNestedKeyValueLines (str, parseValue) {
  return str.split('\n').filter(x => !!x).reduce((map, line) => {
    const [key, ...value_] = line.split(': ');
    map[key] = parseKeyValueLine(value_.join(': '), parseValue);
    return map;
  }, {});
}

function matchItems (items, filters, keyPredicate) {
  return Object.keys(items).filter(k => {
    const mapItem = items[k];
    for (const fk of Object.keys(filters)) {
      const fv = filters[fk];
      const predicateFn = keyPredicate[fk] || ((a,b) => a === b);
      if (mapItem[fk] != null && !(predicateFn(mapItem[fk], fv))) {
        return false;
      }
    }
    return true;
  });
}

module.exports = function runner(inputFile, verbose) {
  const tickerStr = `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;
  const ticker = parseKeyValueLines(tickerStr, x => parseInt(x, 10));
  console.log(ticker);

  let input = parseNestedKeyValueLines(fs.readFileSync(inputFile, 'utf8'), x => parseInt(x, 10));
  console.log(input);

  const solution = matchItems(input, ticker, {
    cats: (item, filter) => item > filter,
    trees: (item, filter) => item > filter,
    pomeranians: (item, filter) => item < filter,
    goldfish: (item, filter) => item < filter,
  })[0];

  assert.equal(solution, 'Sue 405');
  console.log('Final Answer:', solution);
}
