'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('pending', 'processing', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      guestEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      guestPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      guestName: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Addresses',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Orders');
  },
};
