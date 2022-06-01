const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Category = require("./Category");

const OrderSchema = new Schema(
  {
    order_id: String,
    amount: Number,
    payment_method: String,
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    active: Boolean,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

OrderSchema.virtual("orderCourses", {
  ref: "Course",
  foreignField: "_id",
  localField: "courses",
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
