const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../node_modules/node-expose-sspi');
fs.mkdirSync(dir, { recursive: true });

const tmpl = `
module.exports = require("../../index.js");
`;
fs.writeFileSync(path.resolve(dir, 'index.js'), tmpl);


const tmpl2 = `
import nodeExposeSspi = require("../..");
export = nodeExposeSspi;
`;
fs.writeFileSync(path.resolve(dir, 'index.ts'), tmpl2);
