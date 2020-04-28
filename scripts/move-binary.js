const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

console.log('about to move');
fs.renameSync(
  path.resolve(projectDir, './build/Release/api.node'),
  path.resolve(projectDir, './lib/api.node')
);
