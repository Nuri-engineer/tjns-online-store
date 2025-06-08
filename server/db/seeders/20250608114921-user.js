'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface) {
    const passwordHash = await bcrypt.hash('123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        name: 'Nurik',
        number: '1234567890',
        email: 'nur@gmail.com',
        password: passwordHash,
        status: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Joe',
        number: '1234567890',
        email: 'joe@joe.com',
        password: passwordHash,
        status: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Don',
        number: '1234567890',
        email: 'don@don.com',
        password: passwordHash,
        status: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
