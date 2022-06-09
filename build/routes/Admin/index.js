"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const ProductsRouter_1 = __importDefault(require("./ProductsRouter"));
const DropdownRouter_1 = __importDefault(require("./DropdownRouter"));
const CategoryRouter_1 = __importDefault(require("./CategoryRouter"));
const SubCategoryRouter_1 = __importDefault(require("./SubCategoryRouter"));
router.use('/Product', ProductsRouter_1.default);
router.use('/dropdowns', DropdownRouter_1.default);
router.use('/category', CategoryRouter_1.default);
router.use('/subcategory', SubCategoryRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map