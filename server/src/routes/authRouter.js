const authRouter = require('express').Router()
const AuthController = require('../controllers/AuthController');

authRouter.post('/signup', AuthController.signup);
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);
authRouter.post('/signupAdmin', AuthController.signupAdmin);
authRouter.get('/getAdmin', AuthController.getAdmin);
authRouter.get('/getUsers', AuthController.getUsers);


module.exports = authRouter