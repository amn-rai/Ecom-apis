"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileUploadConfig_1 = require("../../utils/fileUploadConfig");
const router = express_1.Router();
const ProductsController_1 = require("../../controllers/Admin/ProductsController");
router.post('/', fileUploadConfig_1.uploadSingleFileToLocal('product'), ProductsController_1.addProduct);
router.get('/', ProductsController_1.getProducts);
router.get('/:id', ProductsController_1.getProduct);
router.put('/', ProductsController_1.updateProduct);
exports.default = router;
//# sourceMappingURL=ProductsRouter.js.map