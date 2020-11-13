const { sso } = require('node-expose-sspi');

const url = process.argv[2] || 'http://localhost:3000';

(async () => {
  try {
    const response = await new sso.Client().fetch(url);
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }
})();
