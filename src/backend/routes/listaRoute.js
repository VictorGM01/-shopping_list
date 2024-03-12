const ListaController = require('../controllers/listaController.js');

module.exports = async function (fastify, options) {
  fastify.post('/', ListaController.create);
};