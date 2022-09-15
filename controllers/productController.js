const { Product } = require('../models');

const getProducts = async (_, res) => {
  try {
    const products = await Product.findAll({ where: { isActive: true } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const numId = Number(id);
  if (Number.isNaN(numId)) {
    return res.status(400).json({
      message: 'ID must be a number',
    });
  }

  try {
    const product = await Product.findOne({ where: { id: numId } });

    if (!product) {
      return res.status(404).json({ msg: `We dont have product with Id:${id}` });
    }

    if (!product.isActive) {
      return res.status(400).json({ msg: `Product Alredy Deleted` });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const numId = Number(id);
  if (Number.isNaN(numId)) {
    return res.status(400).json({
      message: 'ID must be a number',
    });
  }

  try {
    const product = await Product.findOne({ where: { id: numId } });

    if (!product) {
      return res.status(404).json({ msg: `We dont have product with Id:${id}` });
    }

    await Product.update({ isActive: false }, { where: { id: numId } });

    return res.status(200).json({ msg: 'Product Deleted' });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, qty, picture, expiredAt } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ msg: 'Name cant be empty' });
    }
    if (!qty) {
      return res.status(400).json({ msg: 'Quantity cant be empty' });
    }
    if (!expiredAt) {
      return res.status(400).json({ msg: 'Expired at cant be empty' });
    }

    const product = await Product.create({
      name,
      qty,
      picture,
      expiredAt,
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { picture, name, qty, expiredAt } = req.body;
  const { id } = req.params;

  const numId = Number(id);
  if (Number.isNaN(numId)) {
    return res.status(400).json({
      message: 'ID must be a number',
    });
  }

  try {
    if ('isActive' in req.body) {
      return res.status(400).json({ msg: 'Invalid Input Key' });
    }
    const product = await Product.findOne({ where: { id: numId } });

    if (!product) {
      return res.status(404).json({ msg: `We dont have product with Id:${id}` });
    }
    if (product.isActive === false) {
      return res.status(400).json({ msg: 'Product Alredy Deleted' });
    }
    await Product.update({ picture, name, qty, expiredAt }, { where: { id: numId } });

    const updatedProduct = await Product.findOne({ where: { id: numId } });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = { addProduct, getProducts, getProduct, deleteProduct, updateProduct };
