var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
const uploadCategory = require("../middleware/uploadCategory");
const uploadCourse = require("../middleware/uploadCourse");
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const CourseController = require("../controllers/CourseController");
const ContactUsController = require("../controllers/ContactUsController");
const CartController = require("../controllers/CartController");
const OrderController = require("../controllers/OrderController");
const CourseContentController = require("../controllers/CourseContentController");
const CourseContentDataController = require("../controllers/CourseContentDataController");
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);
// Register
router.post(
  "/register",
  UserController.validate("createUser"),
  UserController.createUser
);

// Login
router.post(
  "/login",
  UserController.validate("loginUser"),
  UserController.login
);

// User
router.get("/users", auth, UserController.getAllUsers);
router.put(
  "/userupdate/:id",
  UserController.validate("loginUser"),
  auth,
  UserController.updateuser
);

router.post(
  "/contactus/create",
  ContactUsController.validate("createContactUs"),
  ContactUsController.createContactUs
);
router.get("/contactus", auth, ContactUsController.getAllContactUs);

// Category
router.post(
  "/category/create",
  auth,
  uploadCategory.single("image"),
  CategoryController.createCategory
);
router.get("/categories", auth, CategoryController.getAllCategories);
router.get("/category/:id", auth, CategoryController.getCategory);
router.put(
  "/category/edit/:id",
  uploadCategory.single("image"),
  auth,
  CategoryController.updateCategory
);
router.delete("/category/delete/:id", auth, CategoryController.deleteCategory);

// Course
router.post(
  "/course/create",
  auth,
  uploadCourse.single("image"),
  CourseController.createCourse
);
router.get("/courses", auth, CourseController.getAllCourses);
router.get("/course/:id", auth, CourseController.getCourse);
router.put(
  "/course/edit/:id",
  uploadCourse.single("image"),
  auth,
  CourseController.updateCourse
);
router.delete("/course/delete/:id", auth, CourseController.deleteCourse);

// CourseContent
router.post(
  "/course/content/create",
  auth,
  CourseContentController.createCourseContent
);
router.get(
  "/coursecontents",
  auth,
  CourseContentController.getAllCourseContents
);
router.get(
  "/course/content/:id",
  auth,
  CourseContentController.getCourseContent
);
router.put(
  "/course/content/edit/:id",
  auth,
  CourseContentController.updateCourseContent
);
router.delete(
  "/course/content/delete/:id",
  auth,
  CourseContentController.deleteCourseContent
);

// CourseContentData
router.post(
  "/course/contentdata/create",
  auth,
  CourseContentDataController.createCourseContenData
);
// router.get(
//   "/coursecontentdatas",
//   auth,
//   CourseContentDataController.getAllCourseContentData
// );
router.get(
  "/course/contentdata/:id",
  auth,
  CourseContentDataController.getCourseContentData
);
router.put(
  "/course/contentdata/edit/:id",
  auth,
  CourseContentDataController.updateCourseContentData
);
router.delete(
  "/course/contentdata/delete/:id",
  auth,
  CourseContentDataController.deleteCourseContentData
);

// Cart
router.post("/cart/add", auth, CartController.addToCart);
router.get("/carts", auth, CartController.getAllCarts);
router.get("/cart/:id", auth, CartController.getCart);
router.delete("/cart/remove/:id", auth, CartController.removeToCart);

// strip
router.post("/create-checkout-session", auth, OrderController.allCheckout);
router.get("/orders", auth, OrderController.getAllOrder);

module.exports = router;
