const express = require("express");
const NormalOrder = require("../models/NormalOrder");
const ProductStock = require("../models/ProductStock");
const RegularOrder = require("../models/RegularOrder");

module.exports.addOrder = async (req, res) => {
  NormalOrder.create(req.body, (err, order) => {
    if (err) res.status(404).json({ error: err });
    if (order && req.body.mode == "regular") {
      RegularOrder.create(req.body, (err, orders) => {
        if (err) return res.status(404).json({ error: err });
      });
    }
  });
  return res.status(201).json({ success: true });
};

module.exports.getNormalOrder = async (req, res) => {
  NormalOrder.find({})
    .populate("products.id", "name")
    .exec((err, orders) => {
      if (err) res.status(404).json({ error: err });
      if (orders) return res.status(200).json({ orders: orders });
    });
};

module.exports.getRegularOrder = async (req, res) => {
  const date = new Date();
  RegularOrder.find({ nextOrderData: { $lte: date } })
    .populate("products.id", "name")
    .exec((err, orders) => {
      if (err) return res.status(404).json({ error: err });
      if (orders) return res.status(200).json({ orders: orders });
    });
};

module.exports.approveNormalOrder = (req, res) => {
  const id = req.query.id;
  NormalOrder.findById(id, (err, order) => {
    if (err) return res.status(404).json({ error: err });
    if (order) {
      order.products.forEach((prod) => {
        ProductStock.findOne({ id: prod.id }, (err, stock) => {
          if (err) return res.status(404).json({ error: err });
          if (stock) {
            stock.available -= prod.qty;
            stock.save();
          }
        });
      });
      order.status = 1;
      order.save();
    }
  });
  return res.status(201).json({ success: true });
};

module.exports.approveRegularOrder = async (req, res) => {
  const id = req.query.id;
  const date = req.query.date;
  RegularOrder.findById(id, (err, order) => {
    if (err) return res.status(404).json({ error: err });
    if (order) {
      var temp = {
        orderBy: order.orderBy,
        products: order.products,
      };
      NormalOrder.create(temp, (err, data) => {
        if (err) console.log(err);
      });
      order.nextOrderDate = date;
      order.save();
    }
  });
  return res.status(201).json({ success: "Success" });
};

module.exports.getTransactions = async (req, res) => {
  const id = req.query.id;
  NormalOrder.find({ orderBy: id })
    .populate("products")
    .exec((err, orders) => {
      if (err) return res.status(404).json({ error: err });
      if (orders) return res.status(200).json({ orders });
    });
};
