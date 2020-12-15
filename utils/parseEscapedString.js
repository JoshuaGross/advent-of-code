const assert = require('assert');

// Parse an escaped string. It is assumed that str[0] is the beginning quote
// and that there is a final quotation mark too.
module.exports = function parseEscapedString (str) {
  let output = '';
  assert.equal(str[0], str[str.length - 1]);
  for (let i = 1; i < str.length - 1; i++) {
    if (str[i] === '\\') {
      let next = str[++i];
        if (next !== "x") {
          output += next;
        } else if (next === "x") {
          next = str[++i] + str[++i];
          output += String.fromCharCode(parseInt(next, 16));
        }
      } else {
        output += str[i];
      }
  }
  return output;
}
