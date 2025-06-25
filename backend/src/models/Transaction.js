// backend/src/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, unique: true },
  user_id: String,
  product_id: String,
  product_name: String,
  category: String,
  subcategory: String,
  quantity: Number,
  unit_price: Number,
  total_amount: Number,
  discount_amount: Number,
  payment_method: String,
  transaction_status: String,
  timestamp: Date,
  session_id: String,
  device_type: String,
  location: {
    country: String,
    state: String,
    city: String,
    zipcode: String
  },
  marketing_source: String
}, { timestamps: true });

transactionSchema.index({ transaction_id: 1 }, { unique: true });
transactionSchema.index({ user_id: 1 });
transactionSchema.index({ product_id: 1 });
transactionSchema.index({ timestamp: -1 });
transactionSchema.index({ category: 1 });
transactionSchema.index({ transaction_status: 1 });
transactionSchema.index({ timestamp: -1, category: 1 });
transactionSchema.index({ user_id: 1, timestamp: -1 });

module.exports = mongoose.model("Transaction", transactionSchema);

