const express = require("express");
const Order = require("../models/Orders");

module.exports.addOrder = async (req, res) => {
  Order.create(req.body, (err, data) => {
    if (err) return res.status(404).json({ error: err });
    if (data) return res.status(201).json({ data: data });
  });
};

module.exports.updateStatus = async (req, res) => {
  const id = req.query.id;
  const status = req.query.status;
  Order.findByIdAndUpdate(id, { status: status }).exec((err, result) => {
    if (err) return res.status(404).json({ error: err });
    if (result) return res.status(201).json({ success: "updated" });
  });
};

module.exports.getOrders = async (req, res) => {
  Order.find({})
    .populate("category")
    .populate("product.id")
    .populate("from")
    .populate("createdBy","name")
    .exec((err, orders) => {
      if (err) console.log(err);
      if (orders) return res.status(200).json({ orders: orders });
    });
};
