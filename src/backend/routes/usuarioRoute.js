const UsuarioController = require('../controllers/usuarioController.js');

module.exports = async function (fastify, options) {
  fastify.post('/', UsuarioController.create);
  fastify.post('/login', async (request, reply) => {
    // Passa fastify.jwt para o request para que possa ser acessado no controlador
    request.jwt = fastify.jwt;
    await UsuarioController.login(request, reply);
  });
};