const fs = require('fs');
const assert = require('assert');
const { sum, product } = require('../utils');

function parseKeyValueLine (str) {
  return str.split(', ').filter(x => !!x).reduce((map, line) => {
    const [key, value] = line.split(': ');
    map[key] = value;
    return map;
  }, {});
}

function parseKeyValueLines (str) {
  return str.split('\n').filter(x => !!x).reduce((map, line) => {
    const [key, value] = line.split(': ');
    map[key] = value;
    return map;
  }, {});
}

function parseNestedKeyValueLines (str) {
  return str.split('\n').filter(x => !!x).reduce((map, line) => {
    const [key, ...value_] = line.split(': ');
    map[key] = parseKeyValueLine(value_.join(': '));
    return map;
  }, {});
}

function matchItems (items, filters) {
  return Object.keys(items).filter(k => {
    const mapItem = items[k];
    for (const fk of Object.keys(filters)) {
      const fv = filters[fk];
      if (mapItem[fk] != null && mapItem[fk] !== fv) {
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
  const ticker = parseKeyValueLines(tickerStr);
  console.log(ticker);

  let input = parseNestedKeyValueLines(fs.readFileSync(inputFile, 'utf8'));
  console.log(input);

  const solution = matchItems(input, ticker)[0];

  assert.equal(solution, 'Sue 103');
  console.log('Final Answer:', solution);
}
