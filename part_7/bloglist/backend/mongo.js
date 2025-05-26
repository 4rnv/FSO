const mongoose = require("mongoose");
const config = require("./utils/config");
const Blog = require("./models/blog");

const connectToDatabase = () => {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

module.exports = {
  connectToDatabase,
  Blog,
};
