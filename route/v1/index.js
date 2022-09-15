const express = require('express');
const productRouter = require('./product');

const v1 = express.Router();

v1.use('/product', productRouter);

module.exports = v1;
