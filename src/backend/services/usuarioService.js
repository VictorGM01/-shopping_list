const database = require("../database/models");

module.exports = class UsuarioService {
  async create(usuario) {
    const usuarioCriado = await database.usuarios.findOrCreate({
      where: {
        email: usuario.email,
      },
      defaults: {
        nome: usuario.nome,
        senha: usuario.senha,
        ativo: usuario.ativo,
      },
    });

    if (usuario.permissoes && usuarioCriado[1]) {
      const permissoes = await database.permissoes.findAll({
        where: {
          perfil: usuario.permissoes,
        },
      });

      await usuarioCriado[0].setPermissoes(permissoes);
    }

    return usuarioCriado;
  }
};
