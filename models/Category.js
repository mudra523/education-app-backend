const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CategorySchema = new Schema(
  {
    name: String,
    description: String,
    image: { type: String, get: obfuscate },
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } }
);

CategorySchema.virtual("courses", {
  ref: "Course",
  foreignField: "category_id",
  localField: "_id",
});

function obfuscate(image) {
  return process.env.URL + image;
}

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
