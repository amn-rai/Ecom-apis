const mongoose = require('mongoose')

let favouriteSchema = new mongoose.Schema({
    
 store:[{type : mongoose.Schema.Types.ObjectId,ref:"stores"}],
 userId:{
    type:mongoose.Types.ObjectId,
    ref :'userss'
},  
})

module.exports = mongoose.model('favouritestore',favouriteSchema)