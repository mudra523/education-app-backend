const db = require("../config/database");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const { validationResult } = require("express-validator/check");
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { firstname, lastname, username, password, email } = req.body;

  let user = await User.findOne({ username: username });

  const encryptedPassword = await bcrypt.hash(password, 10);

  if (user) {
    return res.status(422).json({
      errors: [
        {
          value: "",
          msg: "UserName already exists",
          param: "username",
          location: "body",
        },
      ],
    });
  } else {
    const customer = await stripe.customers.create({
      name: firstname + " " + lastname,
      email,
    });

    user = new User({
      firstname,
      lastname,
      username,
      password: encryptedPassword,
      email,
      role: "user",
      customerId: customer.id,
    });
    user.save((err, data) => {
      if (err) throw err;
      return res.status(200).json({
        user: data,
        token: jwt.sign({ user }, process.env.TOKEN_SECRET, {
          expiresIn: "5h",
        }),
        meta: {
          msg: "Registered Successfully.",
        },
      });
    });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { username, password } = req.body;

  let user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      user,
      token: jwt.sign({ user }, process.env.TOKEN_SECRET, {
        expiresIn: "5h",
      }),
      meta: {
        msg: "Login Successfully.",
      },
    });
  } else {
    return res.status(422).json({
      errors: [
        {
          value: "",
          msg: "Invalid Credentials",
          param: "password",
          location: "body",
        },
      ],
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const updateuser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const { username, password, email } = req.body;
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      username: username,
      password: password,
      email: email,
    },
    { new: true }
  );

  return res.status(200).json({ user });
};

const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("firstname", "FirstName doesn't exists").exists(),
        body("lastname", "LaseName doesn't exists").exists(),
        body("username", "UserName doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
        body("email")
          .exists()
          .bail()
          .withMessage("Email doesn't exists")
          .isEmail()
          .bail()
          .withMessage("Invalid email"),
      ];
    }

    case "updateUser": {
      return [
        body("firstname", "FirstName doesn't exists").exists(),
        body("lastname", "LaseName doesn't exists").exists(),
        body("username", "UserName doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
        body("email")
          .exists()
          .withMessage("Email doesn't exists")
          .isEmail()
          .withMessage("Invalid email"),
      ];
    }

    case "loginUser": {
      return [
        body("username", "UserName doesn't exists").exists(),
        body("password", "Password doesn't exists").exists(),
      ];
    }
  }
};

module.exports = { createUser, getAllUsers, updateuser, login, validate };
