'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissoes_usuarios extends Model {
    static associate(models) {
      // define association here
    }
  }
  permissoes_usuarios.init({
    id_usuario: DataTypes.INTEGER,
    id_permissao: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'permissoes_usuarios',
  });
  return permissoes_usuarios;
};