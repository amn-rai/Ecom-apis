const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') 
let user = mongoose.Schema({
 
    firstname:{
        type:String,         
        
    },
	lastname:{
        type:String,
    },
	email:{
        type:String,
        unique:true,
        lowercase: true,
        ref:"reviewsModel"
    },
    phone:{
        type:String, 
        default:""
    },
	password:{
        type:String,
        // select:false
     },
    profilepic:{
        type:String,
         default:""
    },
    fbid:{
        type:String,
    
    },
    googleid:{
        type:String,
    
    },
    deviceid:{
        type:String,

        
    },
    devicetype:{
        type:String,
        
    },
    token:{
        type:String
    },
    status:{
        type:String,
        default:"Approved"
    },
    countrycode:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
   
    // orders:{
    // save krvauni user di order 

    createdAt:{
        type:String
    }
    
})


user.set('toObject', { virtuals: true });
user.set('toJSON', { virtuals: true });

user.virtual('favouriteStores',{
    ref:"favouritestore",
    localField:"_id",
    foreignField:"userId"
    })


user.methods.hashPassword= function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

user.methods.compareHash= function(password,hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('userss',user);