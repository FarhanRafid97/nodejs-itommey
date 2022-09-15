const express = require('express');
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../../controllers/productController');

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.post('/', addProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);
productRouter.get('/:id', getProduct);

module.exports = productRouter;
