const User = require("../models/User");
const { TOKEN_SECRET } = require("../config/envs");
const jwt = require("jsonwebtoken");
const express = require("express");

module.exports.login = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(404).json({ error: err });
    if (
      !user ||
      user.password != req.body.password ||
      user.role != req.body.role
    )
      return res.status(404).json({ error: "Invalid Credentials" });
    if (req.body.password == user.password) {
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: "10h",
      });
      return res.status(200).json({ token });
    }
  });
};
