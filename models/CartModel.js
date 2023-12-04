const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  image: { type: String, required: true },
  price: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  url1: { type: String, required: true },
  url2: { type: String, required: true },
  url3: { type: String, required: true },
  useremail: { type: String, required: true },
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
