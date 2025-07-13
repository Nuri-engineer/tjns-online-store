'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Chat }) {
      this.belongsTo(Chat, { foreignKey: 'chatId' });
    }
  }
  Message.init({
    chatId: DataTypes.INTEGER,
    sender: DataTypes.ENUM('guest', 'user', 'admin', 'superadmin'),
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};