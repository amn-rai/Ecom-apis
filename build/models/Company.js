"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const company = mongoose_1.model('company', companySchema);
exports.default = company;
//# sourceMappingURL=Company.js.map