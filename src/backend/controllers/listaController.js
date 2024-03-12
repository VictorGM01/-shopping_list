const ListaService = require("../services/listaService.js");
const Joi = require("joi");

const listaService = new ListaService();

module.exports = class ListaController {
  static async create(request, reply) {
    try {
      const trilha = request.body;

      const idUsuario = request.user.id; 

      const schema = Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        cor: Joi.string().required(),
        ativo: Joi.boolean().required()
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

  static async findAll(request, reply) {
    try {
      const idUsuario = request.user.id;

      const listas = await listaService.findAll(idUsuario);

      reply.status(200).send(listas);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }

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
};