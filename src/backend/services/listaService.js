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

    if (lista.produtos) {
      await listaCriada.setProdutos(lista.produtos);
    }

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

  async addProducts(idLista, produtos, idUsuario) {
    const produtosBanco = await database.produtos.findAll({
      where: {
        id: produtos,
        id_usuario: idUsuario,
      },
    });

    if (produtosBanco.length === 0) {
      return false;
    }

    const lista = await database.listas.findOne({
      where: {
        id: idLista,
        id_usuario: idUsuario,
      },
    });

    if (!lista) {
      return false;
    }

    await lista.addProdutos(produtosBanco);

    return true;
  }

  async findProducts(idLista, idUsuario) {
    const lista = await database.listas.findOne({
      where: {
        id: idLista,
        id_usuario: idUsuario,
      },
      include: {
        association: "produtos",
      },
    });

    return lista.produtos;
  }
};
