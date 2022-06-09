const mongoose = require('mongoose')
let address = new mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    pincode:Number,
    houseno:String,
    area:String,
    city:String,
    state:String,
    landmark:{
        type:String,
        default:""
    },
    name:String,
    phone:Number,
    aphone:{
        type:Number,
        default:0
    },
    type:Number, //0 for home 1 for work 2 for other address
    date:{
        type:String,
        default:require('moment')().valueOf()
    }
})

address = module.exports = mongoose.model('address',address);
