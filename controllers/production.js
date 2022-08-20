const express = require("express");
const Stock = require("../models/Stock");
const Product = require("../models/Product");
const ProductStock = require("../models/ProductStock");
module.exports.updateMaxSize = async (req, res) => {
  Stock.findOneAndUpdate(
    { id: req.body.id, location: "production" },
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
      { id: data.id, location: "production" },
      {
        id: data.id,
        maxSize: data.maxSize,
        available: data.available,
        lastUpdatedBy: data.lastUpdatedBy,
        location: "production",
      },
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
  Stock.find({ location: "production" })
    .populate("id")
    .populate("lastUpdatedBy", "name")
    .exec((err, stock) => {
      if (err) return res.status(404).json({ error: err });
      if (stock) return res.status(200).json(stock);
    });
};

module.exports.makeProduct = async (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) return res.status(404).json({ error: err });
    if (product) {
      req.body.rawmaterial.forEach((prod) => {
        Stock.findOne({ id: prod.id, location: "production" }, (err, stock) => {
          if (err) return res.status(404).json({ error: err });
          if (stock) {
            stock.available -= prod.qty;
            stock.save();
          }
        });
      });

      ProductStock.findOne({id:req.body.category},(err,stock) => {
        if(err) return res.status(404).json({ error:err})
        if(stock){
          stock.available+=req.body.qty;
          stock.save();
        }else{
          ProductStock.create({id:req.body.category,available:req.body.qty},(err,data) => {
            if(err) return res.status(404).json({ error:err})           
          })
        }
      })
    }
  });
  return res.status(200).json({ success: "Success" });
};
