const express = require("express");
const Stock = require("../models/Stock");
const StockHistory = require("../models/StockHistory");
module.exports.updateMaxSize = async (req, res) => {
  Stock.findOneAndUpdate(
    { id: req.body.id, location: "row" },
    { maxSize: req.body.maxSize }
  ).exec((err, data) => {
    if (err) return res.status(404).json({ error: err });
  });
  return res.status(200).json({ success: "Success" });
};

module.exports.addStock = async (req, res) => {
  const ids = req.body.stock;
  const history = req.body.addStockHistory;
  history.location = "row";
  StockHistory.create(history, (err, data) => {
    if (err) return res.status(500).json({ error: err });
  });

  // ids.forEach((data) => {
  //   Stock.findOneAndUpdate(
  //     { id: data.id, location: "row" },
  //     {
  //       id: data.id,
  //       maxSize: data.maxSize,
  //       available: data.available,
  //       lastUpdatedBy: data.lastUpdatedBy,
  //       location: "row",
  //     },
  //     {
  //       new: true,
  //       upsert: true,
  //     }
  //   ).exec((err, docs) => {
  //     if (err) return res.status(404).json({ error: err });
  //   });
  // });

  ids.forEach((data) => {
    Stock.findOne({ id: data.id, location: "row" }, (err, stock) => {
      if (err) return res.status(404).json({ error: err });
      if (stock) {
        stock.available += data.qty;
        stock.lastUpdatedBy = data.lastUpdatedBy;
        stock.save();
      } else {
        Stock.create(
          {
            id: data.id,
            available: data.qty,
            maxSize: data.maxSize,
            lastUpdatedBy: data.lastUpdatedBy,
            location: "row",
          },
          (err, stock) => {
            if (err) return res.status(404).json({ error: err });
          }
        );
      }
    });
  });
  res.status(201).json({ success: "true" });
};

module.exports.getStock = async (req, res) => {
  Stock.find({ location: "row" })
    .populate("id")
    .populate("lastUpdatedBy", "name")
    .exec((err, stock) => {
      if (err) return res.status(404).json({ error: err });
      if (stock) return res.status(200).json(stock);
    });
};

module.exports.getStockHistory = async (req, res) => {
  const id = req.query.id;
  let q={ location: "row"}
  if(id){
    q={$and:[{location: "row"},{addedBy:id}]}
  }

  StockHistory.find(q)
    .populate("addedBy", "name")
    .populate("materials.id", "name")
    .exec((err, history) => {
      if (err) return res.status(404).json({ error: err });
      if (history) return res.status(200).json(history);
    });
};
