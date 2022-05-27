import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const countries = new Schema(
    {
        name: String
    },
    { timestamps: true }
);

export default mongoose.model('countries', countries);
