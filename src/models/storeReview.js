const mongoose = require("mongoose");

let storereviews = new mongoose.Schema({
  storeId: {
    type: mongoose.Types.ObjectId,
    ref: "stores"
  },
  review: {
    type: String,
    trim: true
  },
  rating: {
    type: Number
  },
  reviewBy: {
    type: mongoose.Types.ObjectId, //store userId
    ref: "userss"
  },
  date: {
    type: String,
    default: require("moment")().valueOf()
  }
});

module.exports = mongoose.model("storereviews", storereviews);
