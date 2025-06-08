'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {}
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      number: {
        type: DataTypes.STRING,
        defaultValue: '',
      },

      status: DataTypes.ENUM('superadmin', 'admin', 'user'),
    },

    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
