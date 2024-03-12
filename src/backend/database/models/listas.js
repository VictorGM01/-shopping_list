'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listas extends Model {
    static associate(models) {
      listas.belongsTo(models.usuarios, {
        foreignKey: 'id_usuario',
        as: 'usuario'
      });
      listas.belongsToMany(models.produtos, {
        through: 'listas_produtos',
        foreignKey: 'id_lista',
        as: 'produtos'
      });
    }
  }
  listas.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    cor: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'listas',
  });
  return listas;
};