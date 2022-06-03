const db = require("../config/database");
const Cart = require("../models/Cart");
const fs = require("fs");

const addToCart = async (req, res) => {
  const { category_id, course_id, user_id } = req.body;
  const findInCart = await Cart.findOne({
    category: category_id,
    course: course_id,
    user: user_id,
  });

  if (!findInCart) {
    const cart = await new Cart({
      category: category_id,
      course: course_id,
      user: user_id,
    });
    cart.save((err, data) => {
      if (err) throw err;
      return res.status(200).json({
        cart,
        meta: {
          msg: "Course added in cart.",
        },
      });
    });
  } else {
    return res.status(409).json({
      errors: [
        {
          value: "",
          msg: "Already exist in your cart.",
          param: "cart",
          location: "body",
        },
      ],
    });
  }
};

const getAllCarts = async (req, res) => {
  const { user } = req;
  const carts = await Cart.find({ user: user._id })
    .populate("user")
    .populate({
      path: "course",
    })
    .populate("category");

  res.status(200).json(carts);
};

const getCart = async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findOne({ _id: id });
  res.status(200).json(cart);
};

const removeToCart = async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.remove({ _id: id });
  return res.status(200).json({
    cart,
    meta: {
      msg: "Course removed in cart.",
    },
  });
};

module.exports = {
  addToCart,
  removeToCart,
  getAllCarts,
  getCart,
};
