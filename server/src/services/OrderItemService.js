const { OrderItem, Product } = require('../../db/models');

class OrderItemService {
  static async getItemsByOrderId(orderId) {
    const orderItem = await OrderItem.findAll({
      where: { orderId },
      include: [Product]
    });
    return orderItem;
  }

  static async addItemToOrder({ orderId, productId, quantity, price }) {
    if (!orderId || !productId || !quantity || !price) {
      throw new Error('Не хватает данных для добавления товара в заказ');
    }

    const item = await OrderItem.create({ orderId, productId, quantity, price });
    return item;
  }

  static async updateItem(orderItemId, { quantity, price }) {
    const item = await OrderItem.findByPk(orderItemId);
    if (!item) throw new Error('Позиция не найдена');

    const updated = await item.update({ quantity, price });
    return updated;
  }

  static async deleteItem(orderItemId) {
    const deleted = await OrderItem.destroy({ where: { id: orderItemId } });
    if (!deleted) throw new Error('Позиция не найдена');
    return deleted;
  }
}

module.exports = OrderItemService;