const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Category = require("./Category");

const CourseSchema = new Schema({
  name: String,
  description: String,
  price: String,
  author: String,
  image: String,
  category_id: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
