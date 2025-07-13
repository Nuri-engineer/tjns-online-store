const routerOrderItem = require('express').Router();
const OrderItemController = require('../controllers/OrderItemController');
routerOrderItem
    .route('/')
    .get(OrderItemController.getByOrder)
    .post(OrderItemController.add);
routerOrderItem
    .route('/:id')
    .put(OrderItemController.update)
    .delete(OrderItemController.delete);
module.exports = routerOrderItem;