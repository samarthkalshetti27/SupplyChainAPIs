const express = require("express");
const Order = require("../models/Orders");
const Stock = require("../models/Stock");

module.exports.addOrder = async (req, res) => {
  Order.create(req.body, (err, data) => {
    if (err) return res.status(404).json({ error: err });
    if (data) return res.status(201).json({ success: "success" });
  });
};

module.exports.acceptOrder = async (req, res) => {
  const id = req.query.id;
  Order.findById(id, (err, order) => {
    if (err) return res.status(404).json({ error: err });
    if (order) {
      order.status = 1;
      order.save();
      order.product.forEach((product) => {
        Stock.findOne({ id: product.id }, (err, stock) => {
          if (err) return res.status(404).json({ error: err });
          if (stock) {
            stock.available -= product.qty;
            stock.save();
          }
        });
      });
    }
  });
  return res.status(201).json({ success: "success" });
};

module.exports.updateStatus = async (req, res) => {
  const id = req.query.id;
  const status = req.query.status;

  Order.findByIdAndUpdate(id, { status: status }).exec((err, result) => {
    if (err) return res.status(404).json({ error: err });
    if (result) {
      if (status >= 5) {
        result.product.forEach((prod) => {
          Stock.findOne(
            { $and: [{ id: prod.id }, { location: "production" }] },
            (err, result) => {
              if (err) return res.status(404).json({ error: err });
              if (result) {
                result.available += parseInt(prod.qty);
                result.save();
              } else {
                Stock.create(
                  {
                    id: prod.id,
                    available: prod.qty,
                    location: "production",
                    maxSize: 2000,
                  },
                  (err, data) => {
                    if (err) return res.status(404).json({ error: err });
                  }
                );
              }
            }
          );
        });
      }
      return res.status(201).json({ success: "updated" });
    }
  });
};

module.exports.getDetails = async (req, res) => {
  const id = req.query.id;
  Order.findById(id)
    .populate("product.id", "name")
    .populate("product.category", "name")
    .exec((err, data) => {
      if (err) return res.status(404).json({ error: err });
      if (data) return res.status(200).json(data);
    });
};

module.exports.getOrders = async (req, res) => {
  Order.find({})
    .populate("product.category", "name")
    .populate("product.id")
    .populate("createdBy", "name")
    .exec((err, orders) => {
      if (err) console.log(err);
      if (orders) return res.status(200).json({ orders: orders });
    });
};

module.exports.getOrdersByUser = async (req, res) => {
  Order.find({ createdBy: req.query.id }).exec((err, orders) => {
    if (err) return res.status(404).json({ error: err });
    if (orders) return res.status(200).json({ orders });
  });
};
