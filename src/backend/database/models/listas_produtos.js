'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listas_produtos extends Model {
    static associate(models) {
      // define association here
    }
  }
  listas_produtos.init({
    id_lista: DataTypes.INTEGER,
    id_produto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'listas_produtos',
  });
  return listas_produtos;
};