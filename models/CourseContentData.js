const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Category = require("./Category");

const CourseContentDataSchema = new Schema(
  {
    title: String,
    url: String,
    timeduration: String,
    course_content: { type: Schema.Types.ObjectId, ref: "CourseContent" },
  },
  {
    timestamps: true,
  }
);

const CourseContentData = mongoose.model(
  "CourseContentData",
  CourseContentDataSchema
);

module.exports = CourseContentData;
