const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const UserRoute = express.Router();

UserRoute.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.json({ message: "User is already present !!! Please Login" });
    } else {
      bcrypt.hash(password, 8, async function (err, hash) {
        if (err) {
          return res.send({ message: "Please enter all details" });
        } else {
          await UserModel.create({ name, email, password: hash });
          res.json({ message: "User is registered successfully" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Gettting error while signup" });
  }
});

UserRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          var token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
          res.json({ message: "Login sucessfully", token: token });
        } else {
          res.status(404).json({ message: "Error while verify Hash Password" });
        }
      });
    } else {
      res.json({ message: "Please SignUp first" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error getting while Login" });
  }
});

module.exports = { UserRoute };
