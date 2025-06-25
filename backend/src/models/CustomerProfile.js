// backend/src/models/CustomerProfile.js
const mongoose = require('mongoose');

const customerProfileSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  demographic: {
    age: Number,
    gender: String,
    income_level: String,
    location: {
      country: String,
      state: String,
      city: String
    }
  },
  behavior: {
    total_orders: Number,
    total_spent: Number,
    average_order_value: Number,
    last_purchase_date: Date,
    purchase_frequency: Number,
    preferred_categories: [String],
    preferred_payment_method: String,
    device_preference: String
  },
  engagement: {
    email_open_rate: Number,
    click_through_rate: Number,
    social_media_engagement: Number,
    customer_service_interactions: Number
  },
  lifecycle: {
    acquisition_date: Date,
    lifecycle_stage: String,
    churn_probability: Number,
    lifetime_value: Number,
    predicted_next_purchase: Date
  },
  preferences: {
    communication_preferences: [String],
    product_interests: [String],
    price_sensitivity: String
  }
}, { timestamps: true });

customerProfileSchema.index({ user_id: 1 }, { unique: true });
customerProfileSchema.index({ "lifecycle.lifecycle_stage": 1 });
customerProfileSchema.index({ "lifecycle.churn_probability": -1 });

module.exports = mongoose.model("CustomerProfile", customerProfileSchema);
