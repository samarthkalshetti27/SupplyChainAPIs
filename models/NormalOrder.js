const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "types",
      },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: Number,
    default: 0,
  },
},{timestamps: true});

const NormalOrder=mongoose.model("NormalOrder",orderSchema);
module.exports = NormalOrder;