const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ message: "Please login first" });
  }
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return req.json({ message: "Please Login First" });
    } else {
      req.userID = decoded.userId;
      next();
    }
  });
};

module.exports = { Authentication };
