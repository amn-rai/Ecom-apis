"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const ProductsController_1 = require("../../controllers/Admin/ProductsController");
router.get('/', ProductsController_1.getProducts);
router.get('/:id', ProductsController_1.getProduct);
exports.default = router;
//# sourceMappingURL=ProductsRouter.js.map