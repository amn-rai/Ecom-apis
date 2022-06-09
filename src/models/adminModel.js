const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') 
let admin = mongoose.Schema({
 
    firstname:{
        type:String,         
        
    },
	lastname:{
        type:String,
    },
	email:{
        type:String,
    },
	password:{
        type:String,
     },
    profilepic:{
        type:String,
    },
})
// admin.methods.hashPassword= function(password){
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

// admin.methods.compareHash= function(password,hash){
//     return bcrypt.compareSync(password, hash);
// }
//$2a$10$l5LT6X1Z1CLQT97rY.NfJOY/5SuM5cC1gqCS1q2JJX71dKZN2O0BK
module.exports = mongoose.model('admin',admin);