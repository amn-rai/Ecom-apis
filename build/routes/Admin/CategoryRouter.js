"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const fileUploadConfig_1 = require("../../utils/fileUploadConfig");
const CategoryController_1 = require("../../controllers/Admin/CategoryController");
router.post('/', fileUploadConfig_1.uploadSingleFileToS3('logo'), CategoryController_1.addCategory);
router.get('/', CategoryController_1.getCategorys);
router.get('/:id', CategoryController_1.getCategory);
router.put('/', CategoryController_1.updateCategory);
exports.default = router;
//# sourceMappingURL=CategoryRouter.js.map