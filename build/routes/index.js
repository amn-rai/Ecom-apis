"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Admin_1 = __importDefault(require("./Admin"));
const Auth_1 = __importDefault(require("./Auth"));
const Users_1 = __importDefault(require("./Users"));
const router = express_1.Router();
router.use('/admin', Admin_1.default);
router.use('/auth', Auth_1.default);
router.use('/user', Users_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map