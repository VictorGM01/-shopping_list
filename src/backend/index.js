const fastify = require("fastify")({ logger: true });
const routes = require("./routes/routes.js");

fastify.addHook('onRequest', (request, reply, done) => {
  if (request.method === 'POST' && !request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
  }
  done();
});

fastify.register(routes);

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