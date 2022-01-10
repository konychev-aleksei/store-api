import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: String,
  products: [Object],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
