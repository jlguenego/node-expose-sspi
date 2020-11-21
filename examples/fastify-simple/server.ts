// Require the framework and instantiate it
import f from 'fastify';
import fastifyExpress from 'fastify-express';
import { sso } from 'node-expose-sspi';

const fastify = f({ logger: true });

// Run the server!
const start = async (): Promise<void> => {
  try {
    await fastify.register(fastifyExpress);
    fastify.use(sso.auth());
    // Declare a route
    fastify.get('/', (request, reply): void => {
      reply.send({ sso: request.raw.sso });
    });
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
