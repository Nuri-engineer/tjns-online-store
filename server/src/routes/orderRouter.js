const orderRouter = require('express').Router();
const OrderController = require('../controllers/OrderController');

orderRouter.post('/', OrderController.create); // создать черновик
orderRouter.get('/', OrderController.getAll); // все заказы
orderRouter.get('/:id', OrderController.getById); // один заказ
orderRouter.put('/:id', OrderController.updateStatus); // обновить статус
orderRouter.put('/:id/checkout', OrderController.checkout); // при оплате заказа
orderRouter.delete('/:id', OrderController.delete); // удалить заказ

module.exports = orderRouter;