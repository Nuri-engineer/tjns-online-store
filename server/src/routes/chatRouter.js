const chatRouter = require('express').Router();
const ChatController = require('../controllers/ChatController');

chatRouter.get('/all', ChatController.getAllChats);
chatRouter.post('/', ChatController.findOrCreateChatByUserId);
chatRouter.post('/merge', ChatController.mergeGuestChatWithUser);

module.exports = chatRouter