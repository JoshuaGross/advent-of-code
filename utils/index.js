const fs = require('fs');
const path = require('path');
const normalizedPath = path.join(__dirname, './');

const _exports = {};
fs.readdirSync(normalizedPath).forEach(file => {
  _exports[file.replace('.js', '')] = require('./' + file);
});

module.exports = _exports;
