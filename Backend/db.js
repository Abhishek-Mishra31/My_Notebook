const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/My_Notebook";

const connectToMongo = async () => {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
};

module.exports = connectToMongo ;