const usuarioRoutes = require('./usuarioRoute.js');

module.exports = async function routes(fastify, options) {
  fastify.register(usuarioRoutes, { prefix: '/usuarios' });
};