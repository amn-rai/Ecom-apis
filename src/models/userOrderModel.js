const mongoose = require("mongoose");
const moment = require("moment");

let userOrderModel = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "userss"
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products"
  },
  orderCount: {
    type: Number
    // default:1
  },
  status: {
    type: Number,
    default: 0 // default 0 = pending,  1 = Confirm ,2 = dispatched, 3 = cancel by user 4 = out of delivery, 5 = completed , 6 =cancel by store
  },
  price: Number,
  tax: Number,
  discount: Number,
  coupen: String,
  deliverTo:{ type: mongoose.Types.ObjectId } ,
  store: { type: mongoose.Types.ObjectId },
  paymentMethod: String,
  orderTime: {
    type: Number,
    default: moment().valueOf()
  },
  updatedAt: {
    type: Number,
    default: moment().valueOf()
  }
});

orders = module.exports = mongoose.model("userOrderModel", userOrderModel);
// orders:{
// save krvauni user di order ch
// },
