const db = require("../config/database");
const Course = require("../models/Course");
const Order = require("../models/Order");
const fs = require("fs");

const createCourse = async (req, res) => {
  const { name, description, author, price, categoryId } = req.body;

  const course = await new Course({
    name,
    description,
    author,
    price,
    category_id: categoryId,
    image: req.file.path,
    active: true,
  });
  course.save((err, data) => {
    if (err) throw err;
    return res.status(200).json({
      course,
      meta: {
        msg: "Course added successfully.",
      },
    });
  });
};

const getAllCourses = async (req, res) => {
  const { key, categoryId } = req.query;
  const user = req.user;
  let courses = [];
  if (key) {
    courses = await Course.find({
      category_id: categoryId,
      $or: [
        { name: { $regex: ".*" + key + ".*", $options: "i" } },
        { description: { $regex: ".*" + key + ".*", $options: "i" } },
      ],
    }).populate({ path: "orders", match: { user: user._id } });
  } else {
    courses = await Course.find({ category_id: categoryId }).populate({
      path: "orders",
      match: { user: user._id },
    });
  }
  res.status(200).json(courses);
};

const getCourse = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const course = await Course.findOne({ _id: id }).populate({
    path: "orders",
    match: { user: user._id },
  });

  res.status(200).json(course);
};

const updateCourse = async (req, res) => {
  const { name, description, author, price } = req.body;
  const { id } = req.params;
  const obj = {
    name,
    description,
    author,
    price,
  };
  if (req?.file?.path) obj["image"] = req.file.path;

  const course = await Course.findOneAndUpdate({ _id: id }, obj, {
    new: true,
  });

  return res
    .status(200)
    .json({ course, meta: { msg: "Course updated successfully." } });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const course = await Course.remove({ _id: id });
  return res
    .status(200)
    .json({ course, meta: { msg: "Course deleted successfully." } });
};

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  getCourse,
  deleteCourse,
};
