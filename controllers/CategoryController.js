const db = require("../config/database");
const Category = require("../models/Category");
const fs = require("fs");

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await new Category({
    name,
    description,
    image: req.file.path,
  });
  category.save((err, data) => {
    if (err) throw err;
    return res.status(200).json({
      category,
      meta: {
        msg: "Category created successfully.",
      },
    });
  });
};

const getAllCategories = async (req, res) => {
  const { key } = req.query;
  let categories = [];
  if (key) {
    categories = await Category.find({
      $or: [
        { name: { $regex: ".*" + key + ".*" } },
        { description: { $regex: ".*" + key + ".*" } },
      ],
    });
  } else {
    categories = await Category.find();
  }

  res.status(200).json(categories);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id });
  res.status(200).json(category);
};

const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const obj = {
    name,
    description,
  };
  if (req?.file?.path) obj["image"] = req.file.path;

  const category = await Category.findOneAndUpdate({ _id: id }, obj, {
    new: true,
  });

  return res.status(200).json({
    category,
    meta: {
      msg: "Category updated successfully.",
    },
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.remove({ _id: id });
  return res.status(200).json({
    category,
    meta: {
      msg: "Category deleted successfully.",
    },
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  getCategory,
  deleteCategory,
};
