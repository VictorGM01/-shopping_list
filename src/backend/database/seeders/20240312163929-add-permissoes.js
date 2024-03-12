'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissoes', [
      {
        perfil: 'ADMIN',
        descricao: 'Administrador do sistema',
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perfil: 'USER',
        descricao: 'Usuário comum',
        ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissoes', null, {})
  }
};
