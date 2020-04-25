const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');

async function main() {
  try {
    console.log(`installing ${process.arch} api.node`);
    await fs.promises.copyFile(
      path.resolve(projectDir, `./lib/arch/${process.arch}/api.node`),
      path.resolve(projectDir, './lib/api.node')
    );
  } catch (error) {
    console.error('error: ', error);
  }
}

main();
