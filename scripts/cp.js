const fs = require('fs');
const pkg = require('../package.json');
const path = require('path');
const dependencies = pkg.dependencies;

const dirPath = path.resolve(__dirname, '../code');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

fs.writeFileSync(
  path.resolve(__dirname, '../code/package.json'),
  JSON.stringify(
    {
      dependencies,
    },
    null,
    2,
  ),
);
