const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = `./uploads/Category/`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, "Image" + Math.random() + file.originalname);
  },
});
let uploadCategory = multer({
  storage: storage,
});

module.exports = uploadCategory;
