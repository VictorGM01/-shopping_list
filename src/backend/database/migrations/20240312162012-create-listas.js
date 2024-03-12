'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('listas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      cor: {
        type: Sequelize.STRING,
        defaultValue: '#004B56'
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('listas');
  }
};