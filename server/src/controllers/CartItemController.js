const CartItemService = require('../services/CartItemService');

class CartItemController {
    
  static async getAll(req, res) {
    try {
      const items = await CartItemService.getItems(res.locals.user.id);
      res.json(items);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async add(req, res) {
    try {
      const { productId, price } = req.body;

      const item = await CartItemService.addItem({
        userId: res.locals.user.id,
        productId,
        price
      });
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async addMerge(req, res) {
    try {
      const { productId, price, quantity } = req.body;

      const item = await CartItemService.addItem({
        userId: res.locals.user.id,
        productId,
        price,
        quantity,
      });
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async update(req, res) {
    try {
      const item = await CartItemService.updateItem(req.params.itemId, req.body.quantity);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async delete(req, res) {
    try {
      await CartItemService.deleteItem(req.params.itemId, res.locals.user.id);
      res.status(204).send('Элемент корзины удален')
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async validate(req, res) {
    try {
      console.log('Входные данные req.body:', req.body);
    console.log('User ID:', res.locals.user?.id);

    const { cartItems } = req.body;

    // Проверяем, что cartItems — массив
    if (!Array.isArray(cartItems)) {
      console.log('Ошибка: cartItems не является массивом:', cartItems);
      return res.status(400).json({ error: 'Некорректные данные' });
    }

    // Логируем cartItems перед вызовом сервиса
    console.log('CartItems для валидации:', cartItems);

    // Проверяем, что userId существует
    if (!res.locals.user?.id) {
      console.log('Ошибка: userId отсутствует в res.locals.user');
      return res.status(401).json({ error: 'Пользователь не авторизован' });
    }

    // Вызываем сервис валидации
    const result = await CartItemService.validateCartItems(res.locals.user.id, cartItems);
    console.log('Результат валидации:', result);

    res.json(result);
    } catch (error) {
      console.error('Ошибка при проверке корзины', error);
      res.status(500).send('Ошибка сервера при проверке корзины');
    }
  }
}

module.exports = CartItemController;
