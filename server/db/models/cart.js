'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate({User, CartItem}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(CartItem, { foreignKey: 'cartId'});
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};