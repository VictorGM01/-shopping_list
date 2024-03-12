const database = require("../database/models");

module.exports = class ProdutoService {
  async create(produto, idUsuario) {
    const produtoCriado = await database.produtos.create({
      nome: produto.nome,
      link_compra: produto.link_compra,
      preco: produto.preco,
      comprado: produto.comprado,
      id_usuario: idUsuario,
    });

    return produtoCriado;
  }

  async findAll(idUsuario) {
    const produtos = await database.produtos.findAll({
      where: {
        id_usuario: idUsuario,
      },
    });

    return produtos;
  }

  async findOne(idProduto, idUsuario) {
    const produto = await database.produtos.findOne({
      where: {
        id: idProduto,
        id_usuario: idUsuario,
      },
    });

    return produto;
  }

  async remove(idProduto, idUsuario) {
    const produto = await database.produtos.findOne({
      where: {
        id: idProduto,
        id_usuario: idUsuario,
      },
    });

    if (!produto) {
      return false;
    }

    await database.produtos.destroy({
      where: {
        id: idProduto,
      },
    });

    return true;
  }
};
