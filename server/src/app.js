const express = require('express');
const morgan = require('morgan');
const app = express();
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRouter);


module.exports = app;