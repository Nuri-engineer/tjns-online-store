'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Message}) {
      this.belongsTo(User, {foreignKey: 'userId'});
      this.hasMany(Message, {foreignKey: 'chatId'});
    }
  }
  Chat.init({
    userId: DataTypes.INTEGER,
    guestId: DataTypes.STRING,
    lastActivityAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};