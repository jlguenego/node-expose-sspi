// Require the framework and instantiate it
import fastify from 'fastify';
import { sso } from 'node-expose-sspi';

const app = fastify({ logger: true });

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use(sso.auth());

// Declare a route
app.get('/', (request, reply): void => {
  reply.send(request.raw.sso);
});

// Run the server!
const start = async (): Promise<void> => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
