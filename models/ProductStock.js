const mongoose = require("mongoose");

const productStockSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "types",
      required: true,
    },
    maxSize: {
      type: Number,
      default: 1000,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductStock = mongoose.model("productstock", productStockSchema);

module.exports = ProductStock;
