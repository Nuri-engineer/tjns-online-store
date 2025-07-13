const { Favorite, Product } = require('../../db/models');

class FavoriteService {
  static async addFavorite({ userId, productId }) {
    const favorite = await Favorite.create({ userId, productId });
    return favorite;
  }

  static async deleteFavorite({ userId, productId }) {
    const favorite = await Favorite.destroy({ where: { userId, productId } });
    return favorite;
  }

  static async getAllFavoritesByUserId(userId) {
    try {
      if (!userId || Number.isNaN(Number(userId))) {
        throw new Error('Invalid user ID');
      }

      const favorites = await Favorite.findAll({
        where: { userId },
        include: [{ model: Product, as: 'product', required: false }],
        raw: true,
        nest: true,
      });
      return favorites || [];
    } catch (error) {
      console.error('Error in getAllFavoritesByUserId:', error);
      throw error;
    }
  }
}

module.exports = FavoriteService;
