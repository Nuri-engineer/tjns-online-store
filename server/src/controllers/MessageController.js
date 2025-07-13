const MessageService = require('../services/MessageService');

class MessageController {
     
    static async getAllMessagesByChat(req, res) {
        try {
            const { chatId } = req.params;
            const messages = await MessageService.getAllMessagesByChat(chatId);
            res.json(messages);
        } catch (error) {
            console.error('Ошибка при получении сообщений чата', error);
            res.status(404).send('Ошибка сервера при получении сообщений чата');
        }
    }

    static async createMessage(req, res) {
        try {
            const { chatId } = req.params;
            const { sender, content } = req.body;
            const messages = await MessageService.createMessage(chatId, sender, content);
            res.json(messages);
        } catch (error) {
            console.error('Ошибка при создании сообщений чата', error);
            res.status(404).send('Ошибка сервера при создании сообщений чата');
        }
    }
}

module.exports = MessageController