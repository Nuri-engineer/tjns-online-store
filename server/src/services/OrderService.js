const { Order, Address, OrderItem, Product } = require('../../db/models');

class OrderService {

    // Создание черновика заказа
  static async createDraftOrder({ userId, totalPrice }) { 
    const order = await Order.create({
      userId: userId || null,
      totalPrice: totalPrice || 0,
      status: 'pending',
    });
    return order;
  }

  // Получить все заказы
  static async getAllOrders() {
    const orders = await Order.findAll({ include: [Address, OrderItem] });
    return orders;
  }

  // Получить конкретный заказ
  static async getOrderById(id) {
    const order = await Order.findByPk(id, {
      include: [
        { model: Address },
        { model: OrderItem, include: [Product] }
      ]
    });
    if (!order) throw new Error('Заказ не найден');
    return order;
  }

  // Обновить статус заказа

  static async updateOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Заказ не найден');

    order.status = status;
    await order.save();
    return order;
  }

  // при оплате заказа

  static async completeOrder(id, { guestName, guestPhone, guestEmail, addressId }) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Заказ не найден');

    if (!guestName || !guestPhone || !guestEmail || !addressId) {
      throw new Error('Необходимо указать все данные для оформления заказа');
    }

    await order.update({
      guestName,
      guestPhone,
      guestEmail,
      addressId,
      status: 'processing',
    });

    return order;
  }

  // удаление заказа
  static async deleteOrder(id) {
    const deleted = await Order.destroy({ where: { id } });
    if (!deleted) throw new Error('Заказ не найден');
    return deleted;
  }
}

module.exports = OrderService;