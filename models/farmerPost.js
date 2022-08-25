const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "types",
  },
  rawmaterial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RowMaterials",
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  qty: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  location: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },

  images: [{ type: String }],
  status: {
    type: Number,
    default: 0,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const farmerPost = mongoose.model("farmarPost", postSchema);
module.exports = farmerPost;
