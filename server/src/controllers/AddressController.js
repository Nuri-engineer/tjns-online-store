const AddressService = require('../services/AddressService');

class AddressController {
  static async create(req, res) {
    try {
      const address = await AddressService.createAddress(req.body);
      res.status(201).json(address);
    } catch (e) {
      console.error('Ошибка при создании адреса', e);
      res.status(500).send('Ошибка сервера при создании адреса');
    }
  }

  static async getOne(req, res) {
    try {
      const address = await AddressService.getAddressById(req.params.id);
      res.json(address);
    } catch (e) {
      console.error('Ошибка при получении адреса', e);
      res.status(500).send('Ошибка сервера при получении адреса');
    }
  }

  static async delete(req, res) {
    try {
      await AddressService.deleteAddress(req.params.id);
      res.status(204).send();
    } catch (e) {
      console.error('Ошибка при удалении адреса', e);
      res.status(500).send('Ошибка сервера при удалении адреса');
    }
  }
}

module.exports = AddressController;
