const fs = require('fs');
const path = require('path');

function getCppFiles(dirname) {
  const result = [];
  const list = fs.readdirSync(dirname, {
    encoding: 'utf-8',
    withFileTypes: true,
  });
  for (const dirent of list) {
    if (dirent.isDirectory()) {
      const sublist = getCppFiles(path.resolve(dirname, dirent.name));
      result.push(...sublist.map((f) => dirent.name + '/' + f));
      continue;
    }
    if (dirent.name.endsWith('.cc')) {
      result.push(dirent.name);
    }
  }
  return result;
}

const list = getCppFiles(path.resolve(__dirname, '../cpp'));
module.exports = list.map((f) => 'cpp/' + f).join(' ');
