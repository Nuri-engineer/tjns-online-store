const OrderItemService = require('../services/OrderItemService');

class OrderItemController {
  static async getByOrder(req, res) {
    try {
      const items = await OrderItemService.getItemsByOrderId(req.params.orderId);
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async add(req, res) {
    try {
      const item = await OrderItemService.addItemToOrder({ ...req.body, orderId: req.params.orderId });
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async update(req, res) {
    try {
      const item = await OrderItemService.updateItem(req.params.itemId, req.body);
      res.json(item);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async delete(req, res) {
    try {
      await OrderItemService.deleteItem(req.params.itemId);
      res.status(204).send();
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  }
}

module.exports = OrderItemController;
