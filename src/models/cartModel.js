const mongoose = require('mongoose')

let cart = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId
    },
    products:[{
        product:mongoose.Schema.Types.ObjectId,
        count:Number
    }],
    date:{
        select:false,
        type:String
    }
    
})

cart = module.exports = mongoose.model('cart',cart);
