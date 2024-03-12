const UsuarioService = require("../services/usuarioService.js");
const Joi = require("joi");

const usuarioService = new UsuarioService();

module.exports = class UsuarioController {
  
  /**
   * @description Cria um novo usuário
   * @date 3/12/2024 - 7:52:28 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async create(request, reply) {
    try {
      const usuario = request.body;

      const schema = Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
        ativo: Joi.boolean().default(true),
        permissoes: Joi.array()
          .items(Joi.string().valid("ADMIN", "USER"))
          .required(),
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

  
  /**
   * @description Faz login no sistema
   * @date 3/12/2024 - 7:52:38 PM
   *
   * @static
   * @async
   * @param {*} request
   * @param {*} reply
   * @returns {Promise<void>}
   */
  static async login(request, reply) {
    try {
      const usuario = request.body;

      console.log(usuario);
      
      const usuarioEncontrado = await usuarioService.login(usuario);

      const token = request.jwt.sign({ id: usuarioEncontrado.id });

      reply.status(200).send({ token });
    } catch (error) {
      reply.status(500).send({ message: error.message });
    }
  }
};
