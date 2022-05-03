const fs = require('fs');
const pkg = require('../package.json');
const path = require('path');
const dependencies = pkg.dependencies;

fs.writeFileSync(
  path.resolve(__dirname, '../code/package.json'),
  JSON.stringify({
    dependencies,
  }),
);
