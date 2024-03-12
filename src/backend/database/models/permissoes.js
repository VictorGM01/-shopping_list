'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    static associate(models) {
      permissoes.belongsToMany(models.usuarios, {
        through: 'permissoes_usuarios',
        foreignKey: 'id_permissao',
        as: 'usuarios'
      });
    }
  }
  permissoes.init({
    perfil: DataTypes.STRING,
    descricao: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'permissoes',
  });
  return permissoes;
};