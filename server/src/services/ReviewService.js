const { Review, Product, User } = require('../../db/models');

class ReviewService {
  static async createReview({ rating, text, productId, userId }) {
    if (!rating || !text || !productId || !userId) {
      throw new Error('Не хватает данных для создания отзыва');
    }

    const existing = await Review.findOne({ where: { productId, userId } });
    if (existing) {
      throw new Error('Вы уже оставили отзыв к этому товару');
    }
    const rewiew = await Review.create({ rating, text, productId, userId });

    return rewiew;
  }

  static async updateReview(id, { rating, text }) {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('Отзыв не найден');
    }

    await review.update({ rating, text });
    return review;
  }

  static async deleteReview(id) {
    const deleted = await Review.destroy({ where: { id } });
    if (!deleted) {
      throw new Error('Отзыв не найден');
    }
    return deleted;
  }

  // статистика для админки

  static async getAllReviews() {
    const reviews = await Review.findAll({ include: [Product, User] });
    return reviews;
  }

  // для странички товара

  static async getAllReviewsByProductId(productId) {
    const reviews = await Review.findAll({ where: { productId }, include: [User] });
    return reviews;
  }

  // для личного кабинета

  static async getAllReviewsByUserId(userId) {
    const reviews = await Review.findAll({ where: { userId }, include: [Product] });
    return reviews;
  }

  // для проваливания в отзыв

  static async getReviewById(id) {
    const review = await Review.findByPk(id, { include: [Product, User] });
    if (!review) {
      throw new Error('Отзыв не найден');
    }
    return review;
  }
}

module.exports = ReviewService;
