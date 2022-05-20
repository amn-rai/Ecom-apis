import { Schema, model } from 'mongoose';
const companySchema = new Schema(
    {
        name: { type: String, lowercase: true },
        GSTNumber: String,
        website: String,
        companyRegistrationNumber: String,
        addressLine1: String,
        addressLine2: String,
        country: String,
        state: String,
        city: String,
        zipCode: String,
        phone: Number,
        email: String
    },
    { timestamps: true }
);
const company = model('company', companySchema);
export default company;
