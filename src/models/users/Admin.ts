import { Schema, model } from 'mongoose';
const adminSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            lowercase: true
        },
        password: String,
        profilepic: String
    },
    { timestamps: true }
);
const admin = model('admin', adminSchema);
export default admin;
