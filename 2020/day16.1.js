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

function getMatchedRules (rules, value) {
  return rules.map(x => x[1]).filter(ranges => {
    for (const range of ranges) {
      // console.log('range', range, ranges, value);
      if (range[0] <= value && value <= range[1]) {
        return true;
      }
    }
    return false;
  });
}

function getTicketError (input) {
  const [rules, _, tickets] = input;

  return tickets.reduce((acc, ticket) => {
    return ticket.reduce((acc2, value) => {
      const matchedRules = getMatchedRules(rules, value);
      console.log(value, matchedRules);
      return acc2 + (matchedRules.length === 0 ? value : 0);
    }, acc);
  }, 0);
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

  const ticketError = getTicketError(input);

  const solution = ticketError;
  assert.equal(solution, 26869);
  console.log('Final Answer:', solution);
}
