const { Cart, CartItem, Product } = require('../../db/models');

class CartService {
  static async getOrCreateCart(userId) {

  let cart = await Cart.findOne({ 
    where: { userId }, 
    include: [{
      model: CartItem,
      include: [Product]
    }]
  });

  if (!cart) {
    cart = await Cart.create({ userId });
    cart.cartItems = [];
  }
  return cart;
  }

  static async createCartWithItems(userId, items) {
    const cart = await this.getOrCreateCart(userId);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    for (const item of items) {
      // eslint-disable-next-line no-await-in-loop
      const product = await Product.findByPk(item.productId);
      if (!product) throw new Error(`Товар с id ${item.productId} не найден`);
      if (product.stock < item.quantity) throw new Error('Недостаточно товара на складе');

      // eslint-disable-next-line no-await-in-loop
      await CartItem.create({
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        addedAt: now,
        expiresAt,
      });
    }
    return { message: 'Корзина создана с товарами' };
  }


  static async deleteCart(userId) {
    const cart = await Cart.destroy({ where: { userId } });
    return cart
  }

  static async validateCart(items) {
    const result = [];
  
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        result.push({
          productId: item.productId,
          issue: 'not_found',
          message: 'Товар не найден',
        });
        continue;
      }
  
      const hasChanges =
        product.stock === 0 ||
        item.quantity > product.stock ||
        product.price !== item.price;
  
      if (hasChanges) {
        result.push({
          productId: product.id,
          product: product.toJSON(),
          quantity: Math.min(item.quantity, product.stock),
          price: product.price,
          issue: 'updated',
          message: 'Данные товара изменились',
        });
      }
    }
  
    return result;
  }
}

module.exports = CartService;