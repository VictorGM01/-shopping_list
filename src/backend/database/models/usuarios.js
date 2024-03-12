'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
      usuarios.hasMany(models.listas, {
        foreignKey: 'id_usuario',
        as: 'listas'
      });
      usuarios.hasMany(models.produtos, {
        foreignKey: 'id_usuario',
        as: 'produtos'
      });
      usuarios.belongsToMany(models.permissoes, {
        through: 'permissoes_usuarios',
        foreignKey: 'id_usuario',
        as: 'permissoes'
      });
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};