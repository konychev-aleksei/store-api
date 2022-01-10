import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: String,
  orders: [String],
});

const User = mongoose.model("User", userSchema);

export default User;
