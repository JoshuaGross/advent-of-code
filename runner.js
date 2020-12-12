#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
  .option('verbose', {
    required: false,
    default: false,
    type: 'boolean'
  })
  .option('year', {
    alias: 'y',
    required: true,
    type: 'number'
  })
  .option('day', {
    alias: 'd',
    required: true,
    type: 'number'
  })
  .option('part', {
    alias: 'p',
    required: false,
    default: 1,
    type: 'number'
  })
  .option('inputSuffix', {
    required: false,
    default: '',
    type: 'string'
  })
  .argv;

const inputSuffix = argv.inputSuffix ? `input.${argv.inputSuffix}` : 'input';
const inputFile = `./${argv.year}/day${argv.day}.${inputSuffix}.txt`;
const runner = require(`./${argv.year}/day${argv.day}.${argv.part}.js`);

runner(inputFile, argv.verbose);
