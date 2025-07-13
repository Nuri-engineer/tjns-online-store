const CartService = require('../services/CartService');

class CartController {
    static async getOrCreate(req, res) {
      try {
        const cart = await CartService.getOrCreateCart(res.locals.user.id);
        console.log('33333333333333333333333333333333333333333333333', cart);
        res.json(cart);
      } catch (e) {
        console.error('Ошибка при создании или получении корзины', e)
        res.status(500).send('Ошибка сервера при создании или получении корзины');
      }
    }
  
    static async delete(req, res) {
      try {
        await CartService.deleteCart(res.locals.user.id);
        res.sendStatus(204)
      } catch (e) {
        console.error('Ошибка при удалении корзины', e)
        res.status(500).send('Ошибка сервера при удалении корзины');
      }
    }

    // static async createCartWithItems(req, res) {
    //   try {
    //     const { items } = req.body;
    //     console.log(items, '----------------------------------------------------------');

    //     if (!Array.isArray(items)) {
    //       return res.status(400).json({ error: 'Некорректные данные'});
    //     }

    //     await CartService.createCartWithItems(res.locals.user.id, items);
    //     res.status(201).json({ message: 'Корзина с элементами успешно создана' });
    //   } catch (error) {
    //     console.error('Ошибка при создании корзины с элементами', error);
    //     res.status(500).send('Ошибка сервера при создании корзины с элементами');
    //   }
    // }

    static async validateCart(req, res) {
      try {
        const { items } = req.body;
        if (!Array.isArray(items)) {
          return res.status(400).json({ error: 'Неверный формат запроса' });
        }
    
        const updatedItems = await CartService.validateCart(items);
    
        if (updatedItems.length === 0) {
          return res.status(200).json({ valid: true });
        }
    
        return res.status(200).json({
          valid: false,
          updatedItems, // тут уже есть и product, и сообщения
        });
      } catch (e) {
        console.error('Ошибка при валидации корзины:', e);
        return res.status(500).json({ error: 'Ошибка сервера при валидации корзины' });
      }
    }
    
  }
  
  module.exports = CartController;