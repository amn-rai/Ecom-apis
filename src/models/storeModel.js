const mongoose = require("mongoose");
const reviewsModel = require("../models/reviewsModel");
const bcrypt = require("bcryptjs");
let storeSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
    // require:true
  },
  phone: {
    type: Number,
    unique:true
  },
  bio: {
    type: String,
    trim: true
  },
  location: {
    lat: String,
    long: String
  },
  password: {
    type: String
  },

  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
  subcategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "subcategories" }
  ],
  storeImg: {
    type: String,
    default: ""
  },
  token: {
    type: String
  },
  tokenForget: {
    type: String
  },
  expireTokenForget: {
    type: Date
  },
  status: {
    type: String,
    default: "Approved"
  },
  countrycode: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  orders: {
    type: String
    // save krvauni user di order
  },
  recommended: {
    type: Number, // 0 or 1 based on admin recommendation
    default: 0
  },
  createdAt: {
    type: String
  }
});

storeSchema.set("toObject", { virtuals: true });
storeSchema.set("toJSON", { virtuals: true });

storeSchema.virtual("allreviews", {
  ref: "storereviews",
  localField: "_id",
  foreignField: "storeId"
});

var virtual = storeSchema.virtual("ratting");
virtual.get(function() {
  if (!this.allreviews || this.allreviews.length === 0) return 0;
  let totalReviews = this.allreviews.length;
  let rating = 0;
  this.allreviews.forEach(review => {
    rating = rating + review.rating;
  });
  let avrageRate = rating / totalReviews;
  return avrageRate;
});

var rattingcount = storeSchema.virtual("rattingcount");
rattingcount.get(function() {
  if (!this.allreviews || this.allreviews.length === 0) return 0;
  return this.allreviews.length;
});
storeSchema.virtual("isfavourite", {
  ref: "favouritestore",
  localField: "_id",
  foreignField: "storeId",
  count: true
});
storeSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

storeSchema.methods.compareHash = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model("stores", storeSchema);
