const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const orig = path.resolve(projectDir, './build/Release/api.node');
const dest = path.resolve(projectDir, `./lib/arch/${process.arch}/api.node`);

console.log(`about to move to: ${dest}`);
fs.renameSync(orig, dest);
