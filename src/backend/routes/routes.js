const usuarioRoutes = require('./usuarioRoute.js');
const listaRoutes = require('./listaRoute.js');

async function routes(fastify, options) {
  fastify.register(usuarioRoutes, { prefix: '/usuarios' });
};

async function routesWithAuth(fastify, options) {
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.register(listaRoutes, { prefix: '/listas' });
}

module.exports = { routes, routesWithAuth };