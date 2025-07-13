const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const tokenRouter = require('./routes/tokenRouter');
const reviewRouter = require('./routes/reviewRouter');
const orderRouter = require('./routes/orderRouter');
const routerOrderItem = require('./routes/routerOrderItem');
const addressRouter = require('./routes/addressRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const cartRouter = require('./routes/cartRouter');
const cartItemRouter = require('./routes/cartItemRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');
const cors = require('cors');
const searchRouter = require('./routes/searchRouter');


const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRouter);

app.use('/api/products', productRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/token', tokenRouter);

app.use('/api/reviews', reviewRouter);

app.use('/api/orders', orderRouter);

app.use('/api/orderItems', routerOrderItem);

app.use('/api/addresses', addressRouter);

app.use('/api/favorites', favoriteRouter);

app.use('/api/carts', cartRouter);

app.use('/api/cartItem', cartItemRouter);

app.use('/api/search', searchRouter);

app.use('/api/chats', chatRouter);

app.use('/api/messages', messageRouter);

module.exports = app;
