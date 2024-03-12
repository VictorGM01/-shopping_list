const fastify = require("fastify")({ logger: true });
const { routes, routesWithAuth } = require("./routes/routes.js");
const dotenv = require("dotenv");

dotenv.config();

fastify.addHook('onRequest', (request, reply, done) => {
  if (request.method === 'POST' && !request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
  }
  done();
});

fastify.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET
});

fastify.decorate("authenticate", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

fastify.register(routes);

fastify.register(routesWithAuth);

// testa a conexão com o banco
fastify.get("/", async (request, reply) => {
  return { message: "API Shopping List. Seja bem-vindo!" };
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});