// backend/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password_hash: String,
  first_name: String,
  last_name: String,
  role: { type: String, enum: ["admin", "analyst", "manager"] },
  registration_date: { type: Date, default: Date.now },
  last_login: Date,
  preferences: {
    dashboard_layout: String,
    notification_settings: Object,
    theme: { type: String, enum: ["light", "dark"] }
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ user_id: 1 }, { unique: true });
userSchema.index({ role: 1 });

module.exports = mongoose.model("User", userSchema);