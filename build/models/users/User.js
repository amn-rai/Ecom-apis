"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const user = mongoose_1.model('user', userSchema);
exports.default = user;
//# sourceMappingURL=User.js.map