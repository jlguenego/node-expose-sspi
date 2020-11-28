const util = require('util');
const { sso } = require('..');

(async () => {
  const status = await sso.getStatusInfo();
  console.log('status: ', util.inspect(status, false, null, true));
})();
