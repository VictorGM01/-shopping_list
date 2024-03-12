const UsuarioService = require("../services/usuarioService.js");
const Joi = require("joi");

const usuarioService = new UsuarioService();

module.exports = class UsuarioController {
  static async create(request, reply) {
    try {
      const usuario = request.body;

      const schema = Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
        ativo: Joi.boolean().default(true),
        permissoes: Joi.array().items(Joi.string().valid("ADMIN", "USER")).required(),
      });

      const { value, error } = schema.validate(usuario);

      if (error) {
        reply.status(400).send({ message: error.message });
        return;
      }

      const usuarioCriado = await usuarioService.create(value);

      reply.status(201).send(usuarioCriado);
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }
};