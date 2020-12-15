module.exports = function escapeString (str, quote='"', includeQuotes = false) {
  let output = (includeQuotes ? quote : '');
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\\' || str[i] === quote) {
      output += '\\';
    }
    output += str[i];
  }
  output += (includeQuotes ? quote : '');
  return output;
};
