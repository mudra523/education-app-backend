const db = require("../config/database");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const { validationResult } = require("express-validator/check");
const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);

const allCheckout = async (req, res) => {
  try {
    const { courses } = req.body;
    const user = req.user;
    await Cart.remove({ user: user._id });
    let total_amount = 0;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items:
        courses?.map((course) => {
          total_amount += course.price;
          return {
            price_data: {
              currency: "inr",
              unit_amount: course.price * 100,
              product_data: {
                name: course.name,
              },
            },
            quantity: 1,
          };
        }) || [],
      success_url: "http://localhost:3000/stripepaymentsuccess",
      cancel_url: "http://localhost:3000/stripepaymentcancel",
    });
    const order = await new Order({
      order_id: session.payment_intent,
      amount: total_amount,
      payment_method: session.payment_method_types[0],
      courses: courses.map((item) => item._id),
      user: user._id,
      active: true,
    });

    order.save((err, data) => {
      if (err) throw err;
    });

    res.status(200).json({ id: session.id });
  } catch (e) {
    console.log(e);
  }
};

const getAllOrder = async (req, res) => {
  const { user } = req;
  const orders = await Order.find({ user: user._id })
    .populate("orderCourses")
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
};

module.exports = { allCheckout, getAllOrder };
