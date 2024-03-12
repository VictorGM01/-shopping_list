const ProdutoController = require("../controllers/produtoController.js");

module.exports = async function (fastify, options) {
  fastify.post("/", ProdutoController.create);
  fastify.get("/", ProdutoController.findAll);
  fastify.get("/:id", ProdutoController.findOne);
  fastify.delete("/:id", ProdutoController.remove);
};
