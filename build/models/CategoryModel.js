"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const categories = new Schema({
    name: String,
    logo: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('categories', categories);
//# sourceMappingURL=CategoryModel.js.map