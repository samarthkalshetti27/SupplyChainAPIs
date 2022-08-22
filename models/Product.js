const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RowMaterials",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "types",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rawmaterial: [materialSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
