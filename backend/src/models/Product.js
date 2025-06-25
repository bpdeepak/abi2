// backend/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: String, unique: true },
  name: String,
  description: String,
  category: String,
  subcategory: String,
  brand: String,
  price: Number,
  cost: Number,
  stock_level: Number,
  reorder_point: Number,
  supplier_id: String,
  attributes: {
    color: String,
    size: String,
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    }
  },
  images: [String],
  ratings: {
    average: Number,
    count: Number
  },
  tags: [String],
  is_active: Boolean
}, { timestamps: true });

productSchema.index({ product_id: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ is_active: 1 });
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
