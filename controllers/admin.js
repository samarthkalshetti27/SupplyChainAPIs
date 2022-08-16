const User = require("../models/User");
const RowMaterail = require("../models/RowMaterails");
const express = require("express");
const Types = require("../models/Types");
module.exports.addUser = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(404).json({ error: err });
    if (user) {
      return res.json({ error: "User Already Exists" });
    }
    User.create(req.body, (err, user) => {
      return res.status(200).json({ success: "Success" });
    });
  });
};
module.exports.addRowMaterial = async (req, res) => {
  RowMaterail.create(req.body, (err, row) => {
    return res.status(201).json({ success: "Added Sucessfully" });
  });
};
module.exports.removeRowMaterial = async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(404).json({ error: "Invalid Request" });
  RowMaterail.findByIdAndDelete(id);
  return res.status(201).json({ success: "Removed!" });
};

module.exports.addType = async (req, res) => {
  Types.create(req.body, (err, type) => {
    if (err) return res.status(404).json({ error: "Invalid Request" });
    if (type) return res.status(201).json({ type: type });
  });
};

module.exports.getAll = async (req, res) => {
  Types.findOne()
    .populate("rowmatrials")
    .populate("subtype")
    .exec((err, data) => {
      if (err) {
        console.error(err);
        return res.status(404).json({ error: err });
      }
      return res.status(200).json(data);
    });
};
