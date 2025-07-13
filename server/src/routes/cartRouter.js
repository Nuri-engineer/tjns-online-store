const cartRouter = require('express').Router();
const CartController = require('../controllers/CartController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

cartRouter.get('/', verifyAccessToken, CartController.getOrCreate);
cartRouter.delete('/', CartController.delete)

cartRouter.post('/validate', CartController.validateCart);

module.exports = cartRouter