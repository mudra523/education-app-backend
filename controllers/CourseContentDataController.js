const db = require("../config/database");
const CourseContentData = require("../models/CourseContentData");
const fs = require("fs");

const createCourseContenData = async (req, res) => {
  const { title, url, timeduration, course_content } = req.body;
  const courseContentData = await new CourseContentData({
    title,
    url,
    timeduration,
    course_content,
  });
  courseContentData.save((err, data) => {
    if (err) throw err;
    return res.status(200).json({
      courseContentData,
      meta: {
        msg: "CourseContentData added successfully.",
      },
    });
  });
};

// const getAllCourseContentData = async (req, res) => {
//   const { key, categoryId } = req.query;
//   let courses = [];
//   if (key) {
//     courses = await Course.find({
//       category_id: categoryId,
//       //   $or: [
//       //     { name: { $regex: ".*" + key + ".*" } },
//       //     { description: { $regex: ".*" + key + ".*" } },
//       //   ],
//     });
//   } else {
//     courses = await Course.find({ category_id: categoryId });
//   }

//   res.status(200).json(courses);
// };

const getCourseContentData = async (req, res) => {
  const { id } = req.params;
  const courseContentData = await CourseContentData.findOne({ _id: id });
  res.status(200).json(courseContentData);
};

const updateCourseContentData = async (req, res) => {
  const { title, url, timeduration } = req.body;
  const { id } = req.params;
  const obj = {
    title,
    url,
    timeduration,
  };

  const courseContentData = await CourseContentData.findOneAndUpdate(
    { _id: id },
    obj,
    {
      new: true,
    }
  );

  return res.status(200).json({
    courseContentData,
    meta: { msg: "CourseContentData updated successfully." },
  });
};

const deleteCourseContentData = async (req, res) => {
  const { id } = req.params;

  const courseContentData = await CourseContentData.remove({ _id: id });
  return res.status(200).json({
    courseContentData,
    meta: { msg: "Course Content data deleted successfully." },
  });
};

module.exports = {
  createCourseContenData,
  //   getAllCourseContentData,
  updateCourseContentData,
  getCourseContentData,
  deleteCourseContentData,
};
