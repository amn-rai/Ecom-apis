"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const CategoryController_1 = require("../../controllers/Admin/CategoryController");
router.get('/', CategoryController_1.getCategorys);
exports.default = router;
//# sourceMappingURL=CategoryRouter.js.map