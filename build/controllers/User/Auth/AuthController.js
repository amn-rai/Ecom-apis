"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.login = exports.getIdFromToken = exports.signJWT = exports.getUsers = exports.registerUser = exports.authenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const users_1 = require("../../../models/users");
const validators_1 = require("../../../validators");
const constants_1 = require("../../../utils/constants");
let userId = {};
const authenticate = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1].trim();
        jsonwebtoken_1.verify(token, process.env.JWTSECRET_User, function (err) {
            if (err)
                return res.status(401).json({ message: constants_1.messages.JWT_INVALID });
            userId = jsonwebtoken_1.decode(token);
            return next();
        });
    }
    else {
        res.status(401).json({ message: constants_1.messages.JWT_REQUIRED });
    }
};
exports.authenticate = authenticate;
const signJWT = result => {
    return jsonwebtoken_1.sign({
        _id: result._id
    }, process.env.JWTSECRET_USER, { expiresIn: constants_1.constants.JWT_EXPIRES_IN });
};
exports.signJWT = signJWT;
const getIdFromToken = req => {
    const token = req.headers.authorization.split('Bearer ')[1].trim();
    return jsonwebtoken_1.decode(token);
};
exports.getIdFromToken = getIdFromToken;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield users_1.UsersModel.find(req.query);
    res.status(200).json(response);
});
exports.getUsers = getUsers;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (validators_1.validationError(req.body, 'registerUser', res))
            return;
        console.log(req.file);
        const { email, password } = req.body;
        const result = yield users_1.UsersModel.findOne({ $or: [{ email }] });
        if (result && result.email === email)
            return res.status(400).json({ message: constants_1.messages.USER_EMAIL_EXIST });
        req.body.password = bcryptjs_1.hashSync(password, bcryptjs_1.genSaltSync(10));
        req.body.email = email;
        req.body.profilePic = `/static/file/${req.file.filename}`;
        yield new users_1.UsersModel(req.body).save();
        res.status(200).json({ message: constants_1.messages.REGISTERED });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (validators_1.validationError(req.body, 'login', res))
            return;
        const { email, password } = req.body;
        let result = yield users_1.UsersModel.findOne({ email }, '-createdAt  -updatedAt -__v ');
        if (result && bcryptjs_1.compareSync(String(password), String(result.password))) {
            if (result.status == 0) {
                return res.status(400).json({ message: constants_1.messages.Ad_DEACTIVATED });
            }
            const token = yield signJWT(result);
            result = result.toObject();
            delete result['password'];
            delete result['status'];
            delete result['_id'];
            result['token'] = token;
            return res.status(200).json(result);
        }
        res.status(400).json({ message: constants_1.messages.LOGIN_FALIED });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
    }
});
exports.login = login;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = getIdFromToken(req);
        console.log('id', _id);
        const response = yield users_1.UsersModel.findById(_id, '-status -_id -password -createdAt -updatedAt -__v');
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
    }
});
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=AuthController.js.map