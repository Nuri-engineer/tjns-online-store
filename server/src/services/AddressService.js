const { Address } = require('../../db/models');

class AddressService {
  static async createAddress({ addressLine, city, postalCode, country, userId }) {
    if (!addressLine || !city || !postalCode || !country) {
      throw new Error('Все поля обязательны');
    }
    const address = await Address.create({ addressLine, city, postalCode, country, userId: userId || null });
    return address
  }

  static async getAddressById(id) {
    const address = await Address.findByPk(id);
    if (!address) throw new Error('Адрес не найден');
    return address;
  }

  static async deleteAddress(id) {
    const deleted = await Address.destroy({ where: { id } });
    if (!deleted) throw new Error('Адрес не найден');
    return deleted;
  }
}

module.exports = AddressService;
