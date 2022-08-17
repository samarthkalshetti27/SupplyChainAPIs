const express = require("express");
const Stock = require("../models/Stock");

module.exports.updateMaxSize = async (req, res) => {
  Stock.findOneAndUpdate(
    { id: req.body.id ,location:"row"},
    { maxSize: req.body.maxSize }
  ).exec((err, data) => {
    if (err) return res.status(404).json({ error: err });
  });
  return res.status(200).json({ success: "Success" });
};

module.exports.addStock = async (req, res) => {
  const ids = req.body.stock;
  ids.forEach((data) => {
    Stock.findOneAndUpdate(
      { id: data.id ,location:"row"},
      { id: data.id, maxSize: data.maxSize, available: data.available,lastUpdatedBy:data.lastUpdatedBy,location:"row" },
      {
        new: true,
        upsert: true,
      }
    ).exec((err, docs) => {
      if (err) return res.status(404).json({ error: err });
    });
  });
  res.status(201).json({ success: "true" });
};

module.exports.getStock = async (req, res) => {
  Stock.find({location:"row"})
    .populate("id")
    .populate("lastUpdatedBy","name")
    .exec((err, stock) => {
      if (err) return res.status(404).json({ error: err });
      if (stock) return res.status(200).json(stock);
    });
};
