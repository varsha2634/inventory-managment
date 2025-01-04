const Supplier = require('../models/Supplier');

// Add Supplier
exports.addSupplier = async (req, res) => {
  try {
    const { name, contactInfo } = req.body;
    const supplier = new Supplier({ name, contactInfo });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Edit Supplier
exports.editSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const supplier = await Supplier.findByIdAndUpdate(id, updates, { new: true });
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Record Order History
exports.recordOrder = async (req, res) => {
  try {
    const { supplierId, productId, quantity, status } = req.body;
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    supplier.orderHistory.push({ productId, quantity, status });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
