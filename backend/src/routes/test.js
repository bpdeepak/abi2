const express = require("express");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

module.exports = router;
