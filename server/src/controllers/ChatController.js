const ChatService = require('../services/ChatService');

class ChatController {
    static async getAllChats(req, res) {
        try {
            const chats = await ChatService.getAllChats();
            res.json(chats);
        } catch (e) {
            console.error('Ошибка при получении чатов', e);
            res.status(500).send('Ошибка сервера при получении чатов');
        }
    }

    static async findOrCreateChatByUserId(req, res) {
        try {
            const {userId, guestId} = req.body
            const chat = await ChatService.findOrCreateChatByUserId(userId, guestId);
            res.json(chat);
        } catch (e) {
            console.error('Ошибка при получении чата', e);
            res.status(500).send('Ошибка сервера при получении чата');
        }
    }

    static async mergeGuestChatWithUser(req, res) {
        try {
            const {guestId, userId} = req.body
            const chat = await ChatService.mergeGuestChatWithUser(guestId, userId);
            res.json(chat);
        } catch (e) {
            console.error('Ошибка при получении чата', e);
            res.status(500).send('Ошибка сервера при получении чата');
        }
    }
}

module.exports = ChatController