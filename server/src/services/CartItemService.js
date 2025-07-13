const { Cart, CartItem, Product } = require('../../db/models');

class CartItemService {
  static async getItems(userId) {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return [];

    const cartItem = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }],
    });

    const result = cartItem.map((item) => {
      const plain = item.toJSON();

      return {
        ...plain,
        product: plain.Product,
      };
    });

    return result;
  }

  static async addItem({ userId, productId, price }) {
    if (!userId || !productId || !price) {
      throw new Error('Недостаточно данных для добавления товара в корзину');
    }
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Корзина не найдена');

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Товар не найден');

    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      const result = await CartItem.findByPk(existingItem.id, { include: [Product] });
      return result;
    }

    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity: 1,
      price,
    });

    const newCart = await CartItem.findOne({
      where: { id: cartItem.id },
      include: [{ model: Product }],
    });

    const plain = newCart.toJSON();

    return {
      ...plain,
      product: plain.Product,
    };

    // return result;
  }

  static async addItemMerge({ userId, productId, price, quantity }) {
    if (!userId || !productId || !price) {
      throw new Error('Недостаточно данных для добавления товара в корзину');
    }
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Корзина не найдена');

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Товар не найден');

    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      const result = await CartItem.findByPk(existingItem.id, { include: [Product] });
      return result;
    }

    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
      price,
    });

    const newCart = await CartItem.findOne({
      where: { id: cartItem.id },
      include: [{ model: Product }],
    });

    const plain = newCart.toJSON();

    return {
      ...plain,
      product: plain.Product,
    };

    // return result;
  }



  static async updateItem(itemId, quantity) {
    if (!itemId || !quantity) {
      throw new Error('Недостаточно данных для обновления товара в корзине');
    }
  
    const item = await CartItem.findByPk(itemId, { include: [Product] }); // Добавляем include
    console.log(item, '111111111111')
    if (!item) throw new Error('Товар не найден');
  
    const product = await Product.findByPk(item.productId);
    if (!product) throw new Error('Товар не найден');
  
    if (quantity > product.stock) {
      throw new Error(`На складе только ${product.stock} шт.`);
    }
  
    if (quantity === 0) {
      throw new Error('Товар закончился');
    }
  
    await item.update({ quantity }); // Обновляем количество
  
    // Возвращаем обновлённый элемент корзины с продуктом (аналогично addItem)
    const updatedItem = await CartItem.findOne({
      where: { id: itemId },
      include: [{ model: Product }],
    });
  
    const plain = updatedItem.toJSON();
  
    return {
      ...plain,
      product: plain.Product, // Прикрепляем продукт
    };
  }

  static async deleteItem(itemId, id) {
    if (!id || !itemId) {
      throw new Error('Недостаточно данных для удаления товара');
    }
  
    // 1. Находим корзину пользователя
    const cart = await Cart.findOne({ where: { userId: id } });
    if (!cart) throw new Error('Корзина не найдена');
    console.log(cart, '1111111111111111111')
    console.log(cart.id, '222222222222222222')
    console.log(itemId, '3333333333333333333333333')
    // 2. Находим элемент корзины по cartId и productId
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: itemId,
      },
    });
  
    if (!cartItem) {
      throw new Error('Товар не найден в корзине');
    }
  
    // 3. Удаляем элемент корзины
    await cartItem.destroy();
    return 
  }

  static async validateCartItems(userId, cartItems) {
    const errors = [];
    const updatedItems = [];

    for (const cartItem of cartItems) {
      const product = await Product.findByPk(cartItem.productId);

      if (!product) {
        errors.push({
          productId: cartItem.productId,
          message: 'Товар не найден',
        });
        continue;
      }

      // update user cartItem!
      const actualQuantity = Math.min(cartItem.quantity, product.stock);

      if (cartItem.quantity > product.stock) {
        // Обновляем корзину, если количество превышает остаток
        await CartItemService.updateItem(cartItem.id, actualQuantity);
      }

      updatedItems.push({
        productId: product.id,
        availableStock: actualQuantity,
      });
    }
    return { errors, updatedItems };
  }
}

module.exports = CartItemService;
