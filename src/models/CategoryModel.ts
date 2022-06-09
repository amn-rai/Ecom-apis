import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const categories = new Schema(
    {
        name: String,
        logo: {
            type: String
        }
    },
    { timestamps: true }
);

export default mongoose.model('categories', categories);
