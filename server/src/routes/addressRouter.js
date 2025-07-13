const addressRouter = require('express').Router();
const addressController = require('../controllers/AddressController');

addressRouter
    .route('/')
    .post(addressController.create);

addressRouter
    .route('/:id')
    .get(addressController.getOne)
    .delete(addressController.delete);

module.exports = addressRouter;