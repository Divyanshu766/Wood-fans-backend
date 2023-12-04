const express = require("express");
const { ProductModel } = require("../models/ProductModel");
const ProductRoute = express.Router();

ProductRoute.post("/add", async (req, res) => {
  try {
    const { image, price, title, type, url1, url2, url3 } = req.body;

    await ProductModel.create({ image, price, title, type, url1, url2, url3 });
    res.send("Product added successfully");
  } catch (error) {
    console.log(error);
    res.status(404).json("Error while adding products");
  }
});
module.exports = { ProductRoute };
