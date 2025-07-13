'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Review, Order, Address, Favorite, Chat }) {
      this.hasMany(Review, { foreignKey: 'userId' });
      this.hasMany(Order, { foreignKey: 'userId' });
      this.hasMany(Address, { foreignKey: 'userId' });
      this.hasMany(Favorite, { foreignKey: 'userId' });
      this.hasMany(Chat, { foreignKey: 'userId' });
    }
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
