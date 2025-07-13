const ReviewService = require('../services/ReviewService');

class ReviewController {
    static async getAllReviews(req, res) {
        try {
          const reviews = await ReviewService.getAllReviews();
          res.json(reviews);
        } catch (error) {
          console.error('Ошибка при получении отзывов', error);
          res.status(500).send('Ошибка сервера при получении отзывов');
        }
      }
    
      static async getReviewById(req, res) {
        try {
          const review = await ReviewService.getReviewById(req.params.id);
          res.json(review);
        } catch (error) {
          console.error('Ошибка при получении отзыва', error);
          res.status(404).send('Ошибка сервера при получении отзыва');
        }
      }
    
      static async getAllReviewsByProductId(req, res) {
        try {
          const reviews = await ReviewService.getAllReviewsByProductId(req.params.productId);
          res.json(reviews);
        } catch (error) {
          console.error('Ошибка при получении отзывов товара', error);
          res.status(500).send('Ошибка сервера при получении отзывов товара');
        }
      }
    
      static async getAllReviewsByUserId(req, res) {
        try {
          const reviews = await ReviewService.getAllReviewsByUserId(req.params.userId);
          res.json(reviews);
        } catch (error) {
          console.error('Ошибка при получении отзывов пользователя', error);
          res.status(500).send('Ошибка сервера при получении отзывов пользователя');
        }
      }
    
      static async createReview(req, res) {
        try {
          const review = await ReviewService.createReview(req.body);
          res.status(201).json(review);
        } catch (error) {
          console.error('Ошибка при создании отзыва', error);
          res.status(400).send('Ошибка сервера при создании отзыва');
        }
      }
    
      static async updateReview(req, res) {
        try {
          const review = await ReviewService.updateReview(req.params.id, req.body);
          res.json(review);
        } catch (error) {
          console.error('Ошибка при обновлении отзыва', error);
          res.status(404).send('Ошибка сервера при обновлении отзыва');
        }
      }
    
      static async deleteReview(req, res) {
        try {
          const result = await ReviewService.deleteReview(req.params.id);
          res.json({ success: true, deleted: result });
        } catch (error) {
          console.error('Ошибка при удалении отзыва', error);
          res.status(404).send('Ошибка сервера при удалении отзыва');
        }
      }
}

module.exports = ReviewController;