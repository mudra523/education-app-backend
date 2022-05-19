const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: String,
  image: String,
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
