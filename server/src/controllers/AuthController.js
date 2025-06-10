const cookieConfig = require('../configs/cookieConfig');
const AuthService = require('../services/AuthService');
const generateTokens = require('../utils/generateTokens');

class AuthController {
  static async signupAdmin(req, res) {
    try {
      const user = await AuthService.signupAdmin(req.body);
      return res.status(200).json({ user });
    } catch (error) {
      console.error('Ошибка при регистрации администратора', error);
      res.status(500).send('Ошибка сервера при регистрации администратора');
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await AuthService.getUser();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Ошибка при получении пользователей', error);
      res.status(500).send('Ошибка сервера при получении пользователей');
    }
  }

  static async getAdmin(req, res) {
    try {
      const user = await AuthService.getAdmins();
      return res.status(200).json(user);
    } catch (error) {
      console.error('Ошибка при получении администратора', error);
      res.status(500).send('Ошибка сервера при получении администратора');
    }
  }

  static async signup(req, res) {
    try {
      const user = await AuthService.signupUser(req.body);
      const { accessToken, refreshToken } = generateTokens({ user });
      return res
        .cookie('refreshToken', refreshToken, cookieConfig)
        .status(200)
        .json({ user, accessToken });
    } catch (error) {
      console.error('Ошибка при регистрации пользователя', error);
      res.status(500).send('Ошибка сервера при регистрации пользователя');
    }
  }

  static async login(req, res) {
    try {
      const user = await AuthService.login(req.body);
      const { accessToken, refreshToken } = generateTokens({ user });

      return res
        .cookie('refreshToken', refreshToken, cookieConfig)
        .status(200)
        .json({ accessToken, user });
    } catch (error) {
      console.error('Ошибка при входе пользователя', error);
      res.status(500).send('Ошибка сервера при входе пользователя');
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie('refreshToken');
      res.sendStatus(200);
    } catch (error) {
      console.error('Ошибка при выходе пользователя', error);
      res.status(500).send('Ошибка сервера при выходе пользователя');
    }
  }
}

module.exports = AuthController;
