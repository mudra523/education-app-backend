const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Category = require("./Category");

const CourseContentSchema = new Schema(
  {
    title: String,
    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CourseContentSchema.virtual("courseContentData", {
  ref: "CourseContentData",
  foreignField: "course_content",
  localField: "_id",
});

const CourseContent = mongoose.model("CourseContent", CourseContentSchema);

module.exports = CourseContent;
