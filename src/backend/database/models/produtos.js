'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produtos extends Model {
    static associate(models) {
      produtos.belongsTo(models.usuarios, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });
      produtos.belongsToMany(models.listas, {
        through: 'listas_produtos',
        foreignKey: 'id_produto',
        as: 'listas'
      });
    }
  }
  produtos.init({
    nome: DataTypes.STRING,
    link_compra: DataTypes.STRING,
    preco: DataTypes.DECIMAL,
    comprado: DataTypes.BOOLEAN,
    id_usuario: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'produtos',
  });
  return produtos;
};