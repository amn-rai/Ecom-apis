const mongoose = require("mongoose");

let reviews = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products"
  },
  // changed from description to review
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
  storeId: {
    type: mongoose.Types.ObjectId, //store userId
    ref: "stores"
  },
  date: {
    type: String
  }
});

module.exports = mongoose.model("reviewsModel", reviews);
