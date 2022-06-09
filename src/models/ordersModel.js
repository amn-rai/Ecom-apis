const mongoose = require('mongoose')

let orders = new mongoose.Schema({
    
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"userss"
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userOrderModel"
    }],
})

orders = module.exports = mongoose.model('ordersModel',orders);







// orders:{
    // save krvauni user di order ch 
    // },