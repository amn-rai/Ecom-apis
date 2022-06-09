"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const SubCategoryController_1 = require("../../controllers/Admin/SubCategoryController");
router.get('/', SubCategoryController_1.getSubCategorys);
exports.default = router;
//# sourceMappingURL=SubCategoryRouter.js.map