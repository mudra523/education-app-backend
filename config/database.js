const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.r5ec9.mongodb.net/${process.env.DATABASE_NAME}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("connected", function () {
  console.log("database is connected successfully");
});
db.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
