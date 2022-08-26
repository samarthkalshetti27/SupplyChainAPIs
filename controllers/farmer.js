const express = require("express");
const farmerPost = require("../models/farmerPost");
const { APP_URL } = require("../config/envs");
const Storage = require("../models/Stock");
module.exports.addPost = async (req, res) => {
  //   let arr = [];
  //   req.files.forEach((file) => {
  //     arr.push(file.filename);
  //   });

  let data = {
    category: req.body.category,
    rawmaterial: req.body.rawmaterial,
    phoneNo: req.body.phoneNo,
    qty: req.body.qty,
    location: req.body.location,
  };

  farmerPost.create(req.body, (err, post) => {
    if (err) return res.status(404).json({ error: err });
    if (post) return res.status(201).json({ id: post.id });
  });
};

module.exports.getPost = async (req, res) => {
  farmerPost
    .find()
    .populate("farmerId", "name")
    .populate("rawmaterial", "name")
    .exec((err, post) => {
      if (err) return res.status(404).json({ error: err });
      if (post) {
        return res.status(200).json(post);
      }
    });
};

module.exports.getMyPost = async (req, res) => {
  const id = req.query.id;
  farmerPost.find({ farmerId: id }, (err, post) => {
    if (err) return res.status(404).json({ error: err });
    if (post) return res.status(200).json(post);
  });
};

module.exports.book = async (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;
  farmerPost.findById(id, (err, post) => {
    if (err) return res.status(404).json({ error: err });
    if (post) {
      post.bookedBy = userId;
      post.status = 1;
      post.save();
    }
  });
  return res.status(200).json({ success: "Success" });
};

module.exports.collect = async (req, res) => {
  const id = req.body.id;
  farmerPost.findById(id, (err, post) => {
    if (err) return res.status(404).json({ error: err });
    if (post) {
      post.status = 2;
      post.save();
      Stock.findById(post.rawmaterial, (err, stock) => {
        if (err) return res.status(404).json({ error: err });
        if (stock) {
          stock.available += parseInt(post.qty);
          stock.save();
        } else {
          Stock.create({
            id: post.rawmaterial,
            maxSize: 2000,
            avilable: post.qty,
            location: "row",
            lastUpdatedBy: post.bookedBy,
          },(err,data) => {
            if(err) return res.status(404).json({ error: err })
          });
        }
      });
    }
  });
  return res.status(201).json({ success: "Success" });
};
