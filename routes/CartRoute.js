const express = require("express");
const { Authentication } = require("../middlewares/authentication");
const { CartModel } = require("../models/CartModel");
const { UserModel } = require("../models/UserModel");
const CartRoute = express.Router();

CartRoute.get("/", Authentication, async (req, res) => {
  const data = await CartModel.find({});
  res.send(data);
});

CartRoute.post("/create", Authentication, async (req, res) => {
  try {
    const { image, price, title, type, url1, url2, url3 } = req.body;

    const userID = req.userID;
    const user = await UserModel.findOne({ _id: userID });
    const userEmail = user?.email;
    console.log(userEmail);
    await CartModel.create({
      image,
      price,
      title,
      type,
      url1,
      url2,
      url3,
      useremail: userEmail,
    });
    res.send("Data is created successfully");
  } catch (error) {
    console.log(error);
  }
});

CartRoute.delete("/delete/:ID", Authentication, async (req, res) => {
  try {
    const tweetId = req.params.ID;

    const userID = req.userID;
    const user = await UserModel.findOne({ _id: userID });
    const userEmail = user?.email;

    await CartModel.findOneAndDelete({ _id: tweetId, useremail: userEmail });
    res.send("Deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = { CartRoute };
