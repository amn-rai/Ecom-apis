const mongoose = require('mongoose')
const moment = require('moment')

let offerSchema = new mongoose.Schema({
    
    name:{
        type:String,
        trim:true
    },
    code:{
        type:String,
        unique:true //offer or coupen code
    },
    type:{
        type:String // single offer combo offer
    },
    discount:{
        type:Number,
    },
    products:[mongoose.Schema.Types.ObjectId],
    totallimit:{
        type:Number,
        default:-1
    }, // limit no of user to use offer -1 for infinite or no limit
    userlimit:{
        type:Number,
        default:-1
    }, // no of users use single coupon
    createdAt:{
        type:String,
        default:moment().valueOf()
    },
    deleted:{
        type:Boolean,
        default:false
    } 
})  

offerSchema.set('toObject', { virtuals: true });
offerSchema.set('toJSON', { virtuals: true });


   
        var virtual = offerSchema.virtual('isavailable');
        virtual.get(function () {
    
          });
    

module.exports = mongoose.model('offer',offerSchema)