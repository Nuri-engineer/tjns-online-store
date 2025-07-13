const OrderService = require('../services/OrderService');

class OrderController {
  // Создание черновика заказа
  static async create(req, res) {
    try {
      const order = await OrderService.createDraftOrder(req.body);
      res.status(201).json(order);
    } catch (e) {
      console.error('Ошибка при создании заказа', e);
      res.status(500).send('Ошибка сервера при создании заказа');
    }
  }

  // Получить все заказы

  static async getAll(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (e) {
      console.error('Ошибка при получении заказов', e);
      res.status(500).send('Ошибка сервера при получении заказов');
    }
  }

  // Получить конкретный заказ
  static async getById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.json(order);
    } catch (e) {
      console.error('Ошибка при получении заказа', e);
      res.status(500).send('Ошибка сервера при получении заказа');
    }
  }

  // Обновить статус заказа
  static async updateStatus(req, res) {
    try {
      const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
      res.json(order);
    } catch (e) {
      console.error('Ошибка при обновлении статуса заказа', e);
      res.status(500).send('Ошибка сервера при обновлении статуса заказа');
    }
  }

  // при оплате заказа
  static async checkout(req, res) {
    try {
      const order = await OrderService.completeOrder(req.params.id, req.body);
      res.json(order);
    } catch (e) {
      console.error('Ошибка при оплате заказа', e);
      res.status(500).send('Ошибка сервера при оплате заказа');
    }
  }

  // удаление заказа
  static async delete(req, res) {
    try {
      await OrderService.deleteOrder(req.params.id);
      res.status(204).send();
    } catch (e) {
      console.error('Ошибка при удалении заказа', e);
      res.status(500).send('Ошибка сервера при удалении заказа');
    }
  }
}

module.exports = OrderController;
