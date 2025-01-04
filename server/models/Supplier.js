const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  orderHistory: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    },
  ],
});

module.exports = mongoose.model('Supplier', SupplierSchema);
