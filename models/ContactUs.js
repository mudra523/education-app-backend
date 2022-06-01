const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactUsSchema = new Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports = ContactUs;
