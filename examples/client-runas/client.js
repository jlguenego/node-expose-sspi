const { sso } = require('../..');
const yargs = require('yargs');
const myArgv = yargs
  .usage('$0 [url]', 'Request a url (by default http://localhost:3000)')
  .option('url', {
    type: 'string',
    description: 'Absolute url',
    default: 'http://localhost:3000'
  })
  .option('user', {
    alias: 'u',
    type: 'string',
    description: 'Run as user',
  })
  .option('password', {
    alias: 'p',
    type: 'string',
    description: 'user password',
  })
  .option('domain', {
    alias: 'd',
    type: 'string',
    description: 'the windows domain',
    default: 'LOCAL',
  })
  .help()
  .alias('h', 'help').argv;

async function main(argv) {
  console.log('argv: ', argv);
  const url = argv.url;
  const client = new sso.Client();
  try {
    if (argv.user) {
      client.setCredentials(argv.domain, argv.user, argv.password);
    }
    const response = await client.fetch(url);
    const json = await response.json();
    console.log('json: ', json);
  } catch (e) {
    console.error(e);
  }
}

main(myArgv);
