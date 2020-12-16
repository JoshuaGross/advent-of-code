const fs = require('fs');
const assert = require('assert');

function parseRule (rule) {
  const [name, rest] = rule.split(': ');
  return [name, rest.split(' ').reduce((acc, rule) => {
    if (rule !== 'or') {
      return acc.concat([rule.split('-').map(x => parseInt(x, 10))]);
    }
    return acc;
  }, [])];
}

function parseTicket (line) {
  return line.split(',').map(x => parseInt(x, 10));
}

function parseInput (str) {
  const [rules, ticket, nearbyTickets] = str.split('\n\n').filter(x => !!x);
  return [rules.split('\n').map(parseRule), parseTicket(ticket.split('\n').filter(x => !!x)[1]), nearbyTickets.split('\n').filter(x => !!x).slice(1).map(parseTicket)];
}

function matchesRule (ranges, value) {
  for (const range of ranges) {
    if (range[0] <= value && value <= range[1]) {
      return true;
    }
  }
  return false;
}

function matchesRules (rules, value) {
  for (const ranges of rules.map(x => x[1])) {
    if (matchesRule(ranges, value)) {
      return true;
    }
  }
  return false;
}

function getTicketError (input) {
  const [rules, _, tickets] = input;

  return tickets.reduce((acc, ticket) => {
    return ticket.reduce((acc2, value) => {
      return acc2 + (matchesRules(rules, value) ? 0 : value);
    }, acc);
  }, 0);
}

function discardInvalidTickets (input) {
  const [rules, _, tickets] = input;

  return tickets.filter(ticket => {
    const ticketError = ticket.reduce((acc, value) => {
      return acc + (matchesRules(rules, value) ? 0 : value);
    }, 0);

    return ticketError === 0;
  });
}

function mapRules ([rules, ..._], tickets) {
  const mappedRules = {};
  const mappedNames = [];
  for (let j = 0; j < tickets[0].length; j++) {
    let foundJ = false;

    for (let i = 0; i < rules.length && !foundJ; i++) {
      const [ruleName, ranges] = rules[i];
      let foundI = true;
      if (mappedNames.indexOf(ruleName) !== -1) {
        continue;
      }
      for (let k = 0; k < tickets.length; k++) {
        foundI = foundI && matchesRule(ranges, tickets[k][j]);
      }
      if (foundI) {
        mappedRules[ruleName] = j;
        mappedNames.push(ruleName);
        foundJ = true;
      }
    }
  }
  return mappedRules;
}

module.exports = function runner(inputFile, verbose) {
  const sampleInput = parseInput(`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`);
  assert.equal(getTicketError(sampleInput), 71);

  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const validTickets = discardInvalidTickets(input);
  const mappedRules = mapRules(input, validTickets);

  const interestingKeys = Object.keys(mappedRules).filter(x => x.indexOf('departure') === 0).map(k => mappedRules[k]);
  const ticketValuesForKeys = interestingKeys.map(k => input[1][k]);
  console.log(mappedRules, interestingKeys, ticketValuesForKeys);

  const solution = ticketValuesForKeys.reduce((acc, v) => acc * v, 1);
  assert.equal(solution, 855275529001);
  console.log('Final Answer:', solution);
}
