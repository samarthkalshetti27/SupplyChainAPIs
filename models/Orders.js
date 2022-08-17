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
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "types",
      required: true,
    },
    product: [materialSchema],
    status: {
      type: Number,
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Users"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
