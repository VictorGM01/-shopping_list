const UsuarioController = require('../controllers/usuarioController.js');

module.exports = async function (fastify, options) {
  fastify.post('/', UsuarioController.create);
};