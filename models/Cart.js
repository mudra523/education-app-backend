const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
