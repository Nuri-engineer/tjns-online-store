const FavoriteService = require('../services/FavoriteService');
const { Favorite } = require('../../db/models');

class FavoriteController {
  static async addFavorite(req, res) {
    try {
      const favorite = await FavoriteService.addFavorite(req.body);
      res.status(201).json(favorite);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное', error);
      res.status(500).send('Ошибка сервера при добавлении в избранное');
    }
  }

  static async deleteFavorite(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const favorite = await Favorite.findOne({
        where: {
          userId,
          productId,
        },
      });
      if (!favorite) {
        return res.status(404).json({ message: 'Избранное не найдено' });
      }
      await favorite.destroy();
      return res.status(200).json(favorite);
    } catch (error) {
      console.error('Ошибка при удалении из избранного', error);
      return res
        .status(500)
        .send(`Ошибка сервера при удалении из избранного: ${error.message}`);
    }
  }

  static async getAllFavoritesByUserId(req, res) {
    try {
      const userId = Number(req.params.userId);

      if (Number.isNaN(userId) || userId <= 0) {
        return res.status(400).json({
          error: 'Некорректный ID пользователя',
          details: 'ID пользователя должно быть положительным числом',
        });
      }

      // Получаем данные
      const favorites = await FavoriteService.getAllFavoritesByUserId(userId);

      return res.json(favorites);
    } catch (error) {
      console.error('Ошибка при получении избранных товаров', error);
      return res.status(500).send(`Ошибка сервера при получении избранных товаров`);
    }
  }
}

module.exports = FavoriteController;
