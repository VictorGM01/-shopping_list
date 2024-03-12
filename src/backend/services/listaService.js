const database = require("../database/models");

module.exports = class ListaService {
  async create(lista, idUsuario) {
    const listaCriada = await database.listas.create({
      nome: lista.nome,
      descricao: lista.descricao,
      cor: lista.cor,
      ativo: lista.ativo,
      id_usuario: idUsuario,
    });

    return listaCriada;
  }

  async findAll(idUsuario) {
    const listas = await database.listas.findAll({
      where: {
        id_usuario: idUsuario,
      },
    });

    return listas;
  }

  async findOne(idLista, idUsuario) {
    const lista = await database.listas.findOne({
      where: {
        id: idLista,
        id_usuario: idUsuario,
      },
    });

    return lista;
  }
};
