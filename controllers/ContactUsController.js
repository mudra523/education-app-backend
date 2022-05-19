const { body } = require("express-validator");
const ContactUs = require("../models/ContactUs");
const { validationResult } = require("express-validator/check");

const createContactUs = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { name, email, subject, message } = req.body;

  const contactUs = new ContactUs({
    name,
    email,
    subject,
    message,
  });
  contactUs.save((err, data) => {
    if (err) throw err;
    return res.json({
      contactUs: data,
    });
  });
};

const getAllContactUs = async (req, res) => {
  const contactUs = await ContactUs.find();
  res.json(contactUs);
};

const validate = (method) => {
  switch (method) {
    case "createContactUs": {
      return [
        body("name", "Name doesn't exists").exists(),
        body("email")
          .exists()
          .bail()
          .withMessage("Email doesn't exists")
          .isEmail()
          .bail()
          .withMessage("Invalid email"),
        body("subject", "Subject doesn't exists").exists(),
        body("message", "Message doesn't exists").exists(),
      ];
    }
  }
};

module.exports = { createContactUs, getAllContactUs, validate };
