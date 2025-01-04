const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, stockLevel, reorderPoint } = req.body;
    const product = new Product({ name, category, stockLevel, reorderPoint });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Edit Product
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Record Stock Transaction
exports.recordTransaction = async (req, res) => {
  try {
    const { productId, transactionType, quantity } = req.body;
    const transaction = new Transaction({ productId, transactionType, quantity, userId: req.user._id });
    await transaction.save();

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.stockLevel += transactionType === 'IN' ? quantity : -quantity;
    await product.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Search Products
exports.searchProducts = async (req, res) => {
  try {
    const { name, category, stockLevel } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (category) filter.category = new RegExp(category, 'i');
    if (stockLevel) filter.stockLevel = { $lte: stockLevel };

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
