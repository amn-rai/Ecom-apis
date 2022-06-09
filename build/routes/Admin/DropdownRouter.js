"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// router.post('/addType', addType);
const DropdownController_1 = require("../../controllers/Admin/DropdownController");
const CommonController_1 = require("../../controllers/Common/CommonController");
router.get('/', CommonController_1.getDropdowns);
router.post('/', DropdownController_1.addDropdownsData);
router.post('/sub', DropdownController_1.addSubDropdownsData);
router.put('/:id', DropdownController_1.updateDropdownData);
exports.default = router;
//# sourceMappingURL=DropdownRouter.js.map