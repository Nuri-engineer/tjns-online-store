const categoryRouter = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

categoryRouter
  .route('/')
  .get(CategoryController.getAllCategories)
  .post(CategoryController.createCategory);

categoryRouter
  .route('/:id')
  .get(CategoryController.getOneCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = categoryRouter;
