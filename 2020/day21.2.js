const fs = require('fs');
const assert = require('assert');
const { product } = require('../utils');

function parseInput(str) {
  return str.split('\n').filter(x => !!x).map(line => {
    const [ingredients, allergens] = line.split('(');
    return [ingredients.split(' ').filter(x => !!x), allergens.replace(')', '').replace('contains ', '').split(', ').filter(x => !!x)];
  });
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const allergenMap = {};
  const ingredientFrequency = {};
  const nonAllergenIngredients = new Set();
  const definedAllergens = {};

  for (const [ingredients, allergens] of input) {
    for (const allergen of allergens) {
      if (allergenMap[allergen]) {
        allergenMap[allergen] = new Set(ingredients.filter(x => allergenMap[allergen].has(x)));
      } else {
        allergenMap[allergen] = new Set(ingredients);
      }
    }
    for (const i of ingredients) {
      ingredientFrequency[i] = (ingredientFrequency[i] || 0) + 1;
      nonAllergenIngredients.add(i);
    }
  }

  const undefinedAllergens = Object.keys(allergenMap);

  while (undefinedAllergens.length > 0) {
    const newlyDefined = undefinedAllergens.filter(k => allergenMap[k].size === 1);
    for (const k of newlyDefined) {
      const ingredient = allergenMap[k].values().next().value;
      definedAllergens[k] = ingredient;
      undefinedAllergens.splice(undefinedAllergens.indexOf(k), 1);
      nonAllergenIngredients.delete(ingredient);
      for (const j of Object.keys(allergenMap)) {
        allergenMap[j].delete(ingredient);
      }
    }
  }

  let solution = Object.keys(definedAllergens).sort().map(a => definedAllergens[a]).join(',');

  assert.equal(solution, 'phc,spnd,zmsdzh,pdt,fqqcnm,lsgqf,rjc,lzvh');
  console.log('Final Answer:', solution);
}
