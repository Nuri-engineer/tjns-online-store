'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ Product, User }) {
      this.belongsTo(Product, { foreignKey: 'productId' });
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Review.init(
    {
      rating: DataTypes.INTEGER,
      text: DataTypes.STRING,
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );
  return Review;
};
