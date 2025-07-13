const {Message, Chat} = require('../../db/models');

class MessageService {
    static async getAllMessagesByChat(chatId) {
        return Message.findAll({where: {chatId}});
    }

    static async createMessage(chatId, sender, content) {
        if (!['guest', 'user', 'admin', 'superadmin'].includes(sender)) {
            throw new Error('Неверное имя отправителя');
        }

        if (!content || typeof content !== 'string') {
            throw new Error('Сообщение не может быть пустым');
        }

        const chat = await Chat.findByPk(chatId);
        if (!chat) {
            throw new Error('Чат не найден');
        }

        const message = await Message.create({chatId: chat.id, sender, content});

        return message
    }
}

module.exports = MessageService