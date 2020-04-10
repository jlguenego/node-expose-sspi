const { sso } = require('../..');

(async () => {
  try {
    const response = await new sso.Client().fetch('http://localhost:3000');
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }
})();
