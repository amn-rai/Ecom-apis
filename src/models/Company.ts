import { Schema, model } from 'mongoose';
const companySchema = new Schema(
    {
        name: String,
        GSTNumber: Number,
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
