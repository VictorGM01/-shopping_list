const ProdutoService = require("../services/produtoService.js");
const Joi = require("joi");

const produtoService = new ProdutoService();

module.exports = class ProdutoController {
  static async create(request, reply) {
    try {
      const produto = request.body;

      const idUsuario = request.user.id;

      const schema = Joi.object({
        nome: Joi.string().required(),
        link_compra: Joi.string(),
        preco: Joi.number().required(),
        comprado: Joi.boolean().default(false),
        listas: Joi.array().items(Joi.number().integer()),
      });

      const { value, error } = schema.validate(produto);

      if (error) {
        reply.status(400).send({ message: error.message });
        return;
      }

      const produtoCriado = await produtoService.create(value, idUsuario);

      reply.status(201).send(produtoCriado);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  static async findAll(request, reply) {
    try {
      const idUsuario = request.user.id;

      const produtos = await produtoService.findAll(idUsuario);

      reply.status(200).send(produtos);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  static async findOne(request, reply) {
    try {
      const idUsuario = request.user.id;
      const idProduto = request.params.id;

      const produto = await produtoService.findOne(idProduto, idUsuario);

      if (!produto) {
        reply.status(404).send({ message: "Produto não encontrado" });
        return;
      }

      reply.status(200).send(produto);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  static async remove(request, reply) {
    try {
      const idUsuario = request.user.id;
      const idProduto = request.params.id;

      const removido = await produtoService.remove(idProduto, idUsuario);

      if (!removido) {
        reply.status(404).send({ message: "Produto não encontrado" });
        return;
      }

      reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }
};
