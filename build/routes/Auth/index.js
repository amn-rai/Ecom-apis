"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileUploadConfig_1 = require("../../utils/fileUploadConfig");
const AuthController_1 = require("../../controllers/User/Auth/AuthController");
const router = express_1.Router();
router.get('/profile', AuthController_1.authenticate, AuthController_1.getUserProfile);
router.post('/login', AuthController_1.login);
router.post('/register', fileUploadConfig_1.uploadSingleFileToS3('profilePic'), AuthController_1.registerUser);
exports.default = router;
//# sourceMappingURL=index.js.map