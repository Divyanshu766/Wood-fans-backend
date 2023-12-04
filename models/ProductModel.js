const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: { type: String, required: true },
  price: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  url1: { type: String, required: true },
  url2: { type: String, required: true },
  url3: { type: String, required: true },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
