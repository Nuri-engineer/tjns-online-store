const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  static async signupAdmin({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('Не достаточно данных для регистрации администратора');
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: await bcrypt.hash(password, 10), status: 'admin' },
    });

    if (!created) {
      throw new Error('Администратор с таким email уже существует');
    }

    const resultUser = user.get();
    delete resultUser.password;
    return resultUser;
  }

  static async getUsers(){
    const users = await User.findAll({
      where: {
        status: 'user',
      },
    });

    return users;
  }

  static async getAdmins() {
    const admins = await User.findAll({
      where: {
        status: 'admin',
      },
    });

    return admins;
  }

  static async signup({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('Не достаточно данных для регистрации пользователя');
    }

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const resultUser = user.get();
    delete resultUser.password;
    return resultUser;
  }

  static async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Не достаточно данных для входа');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Неверный пароль');
    }

    const resultUser = user.get();
    delete resultUser.password;
    return resultUser;
  }
}

module.exports = AuthService;
