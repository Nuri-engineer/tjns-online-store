const { Product } = require('../../db/models');

class ProductService {
  static async getAllProducts({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    return {
      products: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  static async getProductsById(id) {
    const product = await Product.findByPk(id);
    return product;
  }

  static async getAllProductsByCategoryId(id, { page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({
      where: { categoryId: id },
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });
    return {
      products: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  static async createProduct({
    name,
    description,
    images,
    price,
    categoryId,
    brand,
    stock,
  }) {
    if (
      !name ||
      !description ||
      !images ||
      !price ||
      !categoryId ||
      !brand ||
      stock === undefined
    ) {
      throw new Error('Не хватает данных для создания товара');
    }
    const product = await Product.create({
      name,
      description,
      images,
      price,
      categoryId,
      brand,
      stock,
    });
    return product;
  }

  static async updateProduct(
    id,
    { name, description, images, price, categoryId, brand, stock },
  ) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Товар не найден');

    // Приводим к числам, так как из FormData они строкой
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    const parsedCategoryId = Number(categoryId);

    if (
      !name ||
      !description ||
      !images ||
      isNaN(parsedPrice) ||
      isNaN(parsedStock) ||
      isNaN(parsedCategoryId) ||
      !brand
    ) {
      throw new Error('Не хватает данных для обновления товара');
    }

    await product.update({
      name,
      description,
      images,
      price: parsedPrice,
      categoryId: parsedCategoryId,
      brand,
      stock: parsedStock,
    });

    return product;
  }

  static async deleteProduct(id) {
    const deleteProduct = await Product.destroy({ where: { id } });

    if (deleteProduct === 0) {
      throw new Error('Товар не найдена');
    }
    return deleteProduct;
  }
}

module.exports = ProductService;
