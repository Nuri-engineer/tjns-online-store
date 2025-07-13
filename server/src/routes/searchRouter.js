const express = require('express');
const router = express.Router();
const { Product, Category } = require('../../db/models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const { query, categoryName, limit = 10, offset = 0 } = req.query;

    if (!query && !categoryName) {
      return res.status(400).json({
        success: false,
        message: 'Поле query или categoryName не может быть пустым',
      });
    }

    const where = {};

    if (query) {
      where.name = {
        [Op.iLike]: `%${query}%`,
      };
    }

    if (categoryName) {
      const category = await Category.findOne({ where: { name: categoryName } });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Категория не найдена',
        });
      }
      where.categoryId = category.id;
    }

    const products = await Product.findAll({
      where,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: [{ model: Category }],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      results: products,
      message: 'Поиск выполнен успешно',
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: `Ошибка сервера: ${error.message}` });
  }
});

module.exports = router;
