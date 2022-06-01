const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Category = require("./Category");

const CourseSchema = new Schema(
  {
    name: String,
    description: String,
    price: String,
    author: String,
    image: { type: String, get: obfuscate },
    language: String,
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    active: Boolean,
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } }
);

function obfuscate(image) {
  return process.env.URL + image;
}

CourseSchema.virtual("orders", {
  ref: "Order",
  foreignField: "courses",
  localField: "_id",
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
