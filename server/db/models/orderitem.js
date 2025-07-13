'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate({ Product, Order }) {
      this.belongsTo(Product, { foreignKey: 'productId' });
      this.belongsTo(Order, { foreignKey: 'orderId' });
    }
  }
  OrderItem.init(
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderItem',
    },
  );
  return OrderItem;
};
