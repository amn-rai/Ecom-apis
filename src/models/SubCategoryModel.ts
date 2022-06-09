import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const subcategories = new Schema(
    {
        name: String,
        logo: {
            type: String
        },
        category: Schema.Types.ObjectId
    },
    { timestamps: true }
);

export default mongoose.model('subcategories', subcategories);
