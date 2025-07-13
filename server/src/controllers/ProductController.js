const ProductService = require('../services/ProductService');

class ProductController {
  static async getAllProducts(req, res) {
    try {
     const page = +(req.query.page) || 1;
     const limit = +(req.query.limit) || 10;

     const products = await ProductService.getAllProducts({ page, limit });
     res.json(products);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при получении товаров');
      res.status(500).send('Ошибка сервера при получении товаров');
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductsById(id);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при получении товара');
      res.status(500).send('Ошибка сервера при получении товара');
    }
  }

  static async getAllProductsByCategoryId(req, res) {
    try {
      const { id } = req.params;
      const page = +(req.query.page) || 1;
      const limit = +(req.query.limit) || 10;
      const products = await ProductService.getAllProductsByCategoryId(id, { page, limit });
      
      if (!products) {
        throw new Error('Товары не найдены');
      }

      res.json(products);
      
    } catch (error) {
      console.error(
        { error: error.message },
        'Ошибка при получении товаров по категории',
      );
      res.status(500).send('Ошибка сервера при получении товаров по категории');
    }
  }

  static async createProduct(req, res) {
    try {
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`); // путь к файлам

      const { name, description, price, categoryId, brand, stock } = req.body;

      const product = await ProductService.createProduct({
        name,
        description,
        images: imagePaths,
        price,
        categoryId,
        brand,
        stock,
      });

      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при создании товара');
      res.status(500).send('Ошибка сервера при создании товара');
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;

      const files = req.files || [];
      const uploadedImages = files.map((file) => `/uploads/${file.filename}`);

      const oldImages = Array.isArray(req.body.oldImages)
        ? req.body.oldImages
        : req.body.oldImages
        ? [req.body.oldImages]
        : [];

      const allImages = [...oldImages, ...uploadedImages];

      const product = await ProductService.updateProduct(id, {
        ...req.body,
        images: allImages,
      });

      res.json(product);
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
      res.status(500).send('Ошибка сервера при обновлении товара');
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.deleteProduct(id);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при удалении товара');
      res.status(500).send('Ошибка сервера при удалении товара');
    }
  }

  static async getProductsById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductsById(id);
      res.json(product);
    } catch (error) {
      console.error({ error: error.message }, 'Ошибка при получении товара по id');
      res.status(500).send('Ошибка сервера при получении товара по id');
    }
  }
}

module.exports = ProductController;
