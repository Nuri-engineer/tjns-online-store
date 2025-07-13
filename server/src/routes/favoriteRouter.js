const favoriteRouter = require('express').Router();
const FavoriteController = require('../controllers/FavoriteController');

favoriteRouter
    .route('/')
    .post(FavoriteController.addFavorite);

favoriteRouter
    .route('/:userId')
    .get(FavoriteController.getAllFavoritesByUserId)
    .delete(FavoriteController.deleteFavorite)

module.exports = favoriteRouter;