const ListaService = require("../services/listaService.js");
const Joi = require("joi");

const listaService = new ListaService();

module.exports = class ListaController {
  
  /**
   * @description Cria uma nova lista
   * @date 3/12/2024 - 7:50:01 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async create(request, reply) {
    try {
      const trilha = request.body;

      const idUsuario = request.user.id; 

      const schema = Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        cor: Joi.string(),
        ativo: Joi.boolean().default(true),
        produtos: Joi.array().items(Joi.number().integer()).default([]),
      });

      const { value, error } = schema.validate(trilha);

      if (error) {
        reply.status(400).send({ message: error.message });
        return;
      }

      const listaCriada = await listaService.create(value, idUsuario);

      reply.status(201).send(listaCriada);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  
  /**
   * @description Atualiza uma lista existente
   * @date 3/12/2024 - 7:50:37 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async findAll(request, reply) {
    try {
      const idUsuario = request.user.id;

      const listas = await listaService.findAll(idUsuario);

      reply.status(200).send(listas);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  
  /**
   * @description Busca uma lista pelo id
   * @date 3/12/2024 - 7:50:52 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async findOne(request, reply) {
    try {
      const idUsuario = request.user.id;
      const idLista = request.params.id;

      const lista = await listaService.findOne(idLista, idUsuario);

      if (!lista) {
        reply.status(404).send({ message: "Lista não encontrada" });
        return;
      }

      reply.status(200).send(lista);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  
  /**
   * @description Atualiza uma lista existente
   * @date 3/12/2024 - 7:50:59 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async addProducts(request, reply) {
    try {
      const idUsuario = request.user.id;
      const idLista = request.params.id;

      const schema = Joi.object({
        produtos: Joi.array().items(Joi.number().integer()).required(),
      });

      const { value, error } = schema.validate(request.body);

      if (error) {
        reply.status(400).send({ message: error.message });
        return;
      }

      await listaService.addProducts(idLista, value.produtos, idUsuario);

      reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

  
  /**
   * @description Atualiza uma lista existente
   * @date 3/12/2024 - 7:51:10 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async findProducts(request, reply) {
    try {
      const idUsuario = request.user.id;
      const idLista = request.params.id;

      const produtos = await listaService.findProducts(idLista, idUsuario);

      reply.status(200).send(produtos);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }
};