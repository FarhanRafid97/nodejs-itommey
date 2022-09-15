/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Paramex',
        qty: 100,
        expiredAt: '2022-11-17 04:33:12',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Indomie Kari ayam',
        qty: 300,
        expiredAt: '2022-11-17 04:33:12',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete('Products', {
      [Op.or]: [{ name: 'Paramex' }, { name: 'Indomie Kari Ayam' }],
    });
  },
};
