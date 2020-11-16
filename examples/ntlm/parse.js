const { sso } = require('../..');

console.log(process.argv);

const props = sso.negotiateParse(process.argv[2]);
console.log('props: ', props);
