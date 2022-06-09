const mongoose = require("mongoose");

let pricerangeSchema = new mongoose.Schema({
  startprice: Number,
  endprice: Number
});
module.exports = mongoose.model("pricerange", pricerangeSchema);
