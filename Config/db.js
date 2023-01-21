const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb+srv://mock12:mock12@cluster0.aub7do0.mongodb.net/mock12");
};

module.exports = connect;