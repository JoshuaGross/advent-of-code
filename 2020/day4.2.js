const fs = require('fs');

function validatePassportFields (fields) {
  return fields.filter(fullField => {
    const [field, value] = fullField.split(':');
    return validatePassportField(field, value);
  });
}

function validatePassportField (field, value) {
  if (field === 'cid') {
    return false;
  }
  if (field === 'byr') {
    if (value.length !== 4) {
      return false;
    }
    const byr = parseInt(value, 10);
    return byr >= 1920 && byr <= 2002;
  }
  if (field === 'iyr') {
    if (value.length !== 4) {
      return false;
    }
    const iyr = parseInt(value, 10);
    return iyr >= 2010 && iyr <= 2020;
  }
  if (field === 'eyr') {
    if (value.length !== 4) {
      return false;
    }
    const eyr = parseInt(value, 10);
    return eyr >= 2020 && eyr <= 2030;
  }
  if (field === 'hgt') {
    if (value.indexOf('cm') === -1 && value.indexOf('in') === -1) {
      return false;
    }
    const ht = parseInt(value, 10);
    if (value.indexOf('cm') !== -1) {
      return ht >= 130 && ht <= 193;
    } else {
      return ht >= 59 && ht <= 76;
    }
  }
  if (field === 'hcl') {
    return value.match(/^\#[0-9a-f]{6}$/);
  }
  if (field === 'ecl') {
    return value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
  }
  if (field === 'pid') {
    return value.match(/^[0-9]{9}$/);
  }

  return false;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n\n').filter(x => !!x).map(x => validatePassportFields(x.split(/\s/)));

  //console.log(inputLines);
  console.log('Final Answer:', inputLines.filter(x => x.length >= 7).length);
};
