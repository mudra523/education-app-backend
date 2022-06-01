const db = require("../config/database");
const CourseContent = require("../models/CourseContent");
const fs = require("fs");
const CourseContentData = require("../models/CourseContentData");

const createCourseContent = async (req, res) => {
  const { title, course_id } = req.body;
  const courseContent = await new CourseContent({
    title,
    course: course_id,
  });
  courseContent.save((err, data) => {
    if (err) throw err;
    return res.status(200).json({
      courseContent,
      meta: {
        msg: "CourseContent added successfully.",
      },
    });
  });
};

const getAllCourseContents = async (req, res) => {
  const { courseId } = req.query;

  const courseContents = await CourseContent.find({
    course: courseId,
  }).populate("courseContentData");

  res.status(200).json(courseContents);
};

const getCourseContent = async (req, res) => {
  const { id } = req.params;
  const courseContent = await CourseContent.findOne({ _id: id });
  res.status(200).json(courseContent);
};

const updateCourseContent = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const obj = {
    title,
  };

  const courseContent = await CourseContent.findOneAndUpdate({ _id: id }, obj, {
    new: true,
  }).populate("courseContentData");

  return res.status(200).json({
    courseContent,
    meta: { msg: "CourseContent updated successfully." },
  });
};

const deleteCourseContent = async (req, res) => {
  const { id } = req.params;

  await CourseContentData.remove({
    course_content: id,
  });
  const courseContent = await CourseContent.remove({ _id: id });

  return res.status(200).json({
    courseContent,
    meta: { msg: "CourseContent deleted successfully." },
  });
};

module.exports = {
  createCourseContent,
  getAllCourseContents,
  updateCourseContent,
  getCourseContent,
  deleteCourseContent,
};
