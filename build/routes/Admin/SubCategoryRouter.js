"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const fileUploadConfig_1 = require("../../utils/fileUploadConfig");
const SubCategoryController_1 = require("../../controllers/Admin/SubCategoryController");
router.post('/', fileUploadConfig_1.uploadSingleFileToS3('logo'), SubCategoryController_1.addSubCategory);
router.get('/', SubCategoryController_1.getSubCategorys);
router.get('/:id', SubCategoryController_1.getSubCategory);
router.put('/', SubCategoryController_1.updateSubCategory);
exports.default = router;
//# sourceMappingURL=SubCategoryRouter.js.map