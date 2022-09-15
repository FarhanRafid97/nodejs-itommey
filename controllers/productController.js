const { Product } = require('../models');

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
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { addProduct };
