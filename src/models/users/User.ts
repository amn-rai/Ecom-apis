import { Schema, model } from 'mongoose';
const userSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true
        },
        password: String,
        status: {
            type: Number,
            default: 1 // 1 for active 0 for inactive 2 for pending approval
        },
        firstName: String,
        lastName: String,
        profilepic: String,
        phone: Number,
        countryCode: String
    },
    { timestamps: true }
);
const user = model('user', userSchema);
export default user;
