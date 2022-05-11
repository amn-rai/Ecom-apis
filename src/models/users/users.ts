import { Schema, model } from 'mongoose';
const userSchema = new Schema(
    {
        role: Number,
        /*
        0 - RT Admin
        1 - Company Admin
        2 - Accountant
        3 - Vendor
        */
        name: String,
        username: String,
        email: {
            type: String,
            lowercase: true
        },
        password: String,
        status: {
            type: Number,
            default: 1 // 1 for active 0 for inactive
        },
        firstName: String,    
        lastName: String,
        phone: Number,
        designation: String
    },
    { timestamps: true }
);
const user = model('user', userSchema);
export default user;
