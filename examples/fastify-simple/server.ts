// Require the framework and instantiate it
import fastify from 'fastify';
import { sso } from 'node-expose-sspi';

const app = fastify({ logger: true });

app.use(sso.auth());

// Declare a route
app.get('/', async request => (<any>request.raw).sso);

// Run the server!
const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
