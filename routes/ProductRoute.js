const express = require("express");
const { ProductModel } = require("../models/ProductModel");
const ProductRoute = express.Router();

ProductRoute.get("/", async (req, res) => {
  try {
    const { sort, search, order, type } = req.query;
    const query = {};
    const options = {};

    // Filter by Types or Category :-
    if (type) {
      query.type = type;
    }

    // Filter by search term in the title
    if (search) {
      query.title = new RegExp(search, "i");
    }

    //Sort by Price :-
    if (sort == "price") {
      options.sort = { price: order === "asc" ? 1 : -1 };
    }

    const data = await ProductModel.find(query, null, options);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

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
