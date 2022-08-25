const express = require("express");
const farmerPost = require("../models/farmerPost");
const { APP_URL } = require("../config/envs");
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
    .populate("farmerId","name")
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
