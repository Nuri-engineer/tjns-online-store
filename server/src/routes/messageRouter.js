const messageRouter = require('express').Router();
const MessageController = require('../controllers/MessageController');

messageRouter.get('/:chatId/all', MessageController.getAllMessagesByChat);
messageRouter.post('/:chatId', MessageController.createMessage);

module.exports = messageRouter;