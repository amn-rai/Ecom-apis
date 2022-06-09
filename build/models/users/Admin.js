"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    password: String,
    profilepic: String
}, { timestamps: true });
const admin = mongoose_1.model('admin', adminSchema);
exports.default = admin;
//# sourceMappingURL=Admin.js.map