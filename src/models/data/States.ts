import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const states = new Schema(
    {
        name: String,
        country: Schema.Types.ObjectId,
    },
    { timestamps: true }
);

export default mongoose.model('states', states);
