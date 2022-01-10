import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
