const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const orig = path.resolve(projectDir, './build/Release/node_expose_sspi.node');
const dest = path.resolve(
  projectDir,
  `./lib/arch/${process.arch}/node-expose-sspi.node`
);

console.log(`about to move to: ${dest}`);
fs.renameSync(orig, dest);
