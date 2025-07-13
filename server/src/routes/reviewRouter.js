const reviewRouter = require('express').Router();
const ReviewController = require('../controllers/ReviewController');

reviewRouter
  .route('/')
  .get(ReviewController.getAllReviews)
  .post(ReviewController.createReview);

reviewRouter
  .route('/:id')
  .get(ReviewController.getReviewById)
  .put(ReviewController.updateReview)
  .delete(ReviewController.deleteReview);

// получение отзывов по продукту 
reviewRouter.get('/product/:productId', ReviewController.getAllReviewsByProductId);
// получение отзывов по пользователю
reviewRouter.get('/user/:userId', ReviewController.getAllReviewsByUserId);

module.exports = reviewRouter;