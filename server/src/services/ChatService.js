const {Chat} = require('../../db/models');

class ChatService {
    static async findOrCreateChatByUserId(userId, guestId) {
        if (!userId && !guestId) {
            throw new Error('userId или guestId обязательны')
        }

        const where = userId ? { userId } : { guestId };

        let chat = await Chat.findOne({ where });

        if (!chat) {
            chat = await Chat.create({ userId, guestId });
        }

        return chat
    }

    static async getAllChats() {
        const chats = await Chat.findAll();
        return chats    
    }

    static async mergeGuestChatWithUser(guestId, userId) {
        console.log(guestId, '11111111111', userId, '1111111111111111111111');
        const chat = await Chat.findOne({ where: { guestId } });
        if (!chat) {
            throw new Error('Чат не найден');
        }

        if (!chat.userId) {
            chat.userId = userId;
            await chat.save();
        }
        console.log(chat, '22222222222222222222222222222222222222222222222');
        return chat 
    }
}

module.exports = ChatService