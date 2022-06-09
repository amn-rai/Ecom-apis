"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMiddleWare = exports.validationError = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
function validationObj(method) {
    switch (method) {
        case 'login': {
            return joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(6)
            });
        }
        case 'registerUser': {
            return joi_1.default.object({
                email: joi_1.default.string().email().required(),
                firstName: joi_1.default.string().min(3).max(100).required(),
                lastName: joi_1.default.string().min(3).max(100).required(),
                phone: joi_1.default.string().min(7).max(12).required(),
                password: joi_1.default.string().min(6).required()
            });
        }
        case 'get': {
            return joi_1.default.object({
                id: joi_1.default.custom(isObjectId).required()
            });
        }
        case 'getSubCategories': {
            return joi_1.default.object({
                category: joi_1.default.custom(isObjectId),
                page: joi_1.default.number(),
                name: joi_1.default.string()
            });
        }
        case 'getCategories': {
            return joi_1.default.object({
                page: joi_1.default.number(),
                name: joi_1.default.string()
            });
        }
        case 'getDropdownData': {
            return joi_1.default.object({
                model: joi_1.default.string().valid('countries', 'states').required(),
                page: joi_1.default.number().min(1),
                name: joi_1.default.string(),
                query: joi_1.default.string()
            });
        }
        case 'addData': {
            return joi_1.default.object({
                name: joi_1.default.string().required(),
                id: joi_1.default.string().custom(isObjectId),
                model: joi_1.default.string().valid('country').required()
            });
        }
        case 'addSubDropdownData': {
            return joi_1.default.object({
                name: joi_1.default.string().required(),
                subdropdownKey: joi_1.default.string().valid('country').required(),
                subdropdownValue: joi_1.default.string().custom(isObjectId).required(),
                model: joi_1.default.string().valid('state').required()
            });
        }
        case 'sendForgotPasswordLink': {
            return joi_1.default.object({
                email: joi_1.default.string().email().required()
            });
        }
        case 'AddCategory': {
            return joi_1.default.object({
                name: joi_1.default.string().min(2).required()
            });
        }
        case 'AddSubCategory': {
            return joi_1.default.object({
                name: joi_1.default.string().min(2).required(),
                category: joi_1.default.string().custom(isObjectId).required()
            });
        }
        case 'resetPassword': {
            return joi_1.default.object({
                email: joi_1.default.string().email().required(),
                token: joi_1.default.string().required(),
                password: joi_1.default.string().min(6).max(100).required()
            });
        }
        case 'AddProduct': {
            return joi_1.default.object({
                name: joi_1.default.string().required(),
                description: joi_1.default.string().required(),
                category: joi_1.default.string().custom(isObjectId).required(),
                subcategory: joi_1.default.string().custom(isObjectId).required(),
                price: joi_1.default.number().required(),
                discount: joi_1.default.number().required(),
                tax: joi_1.default.number().required(),
                qunatity: joi_1.default.number().required()
            });
        }
    }
}
function validationError(schemaObj, method, res) {
    const dataValidate = validationObj(method).validate(schemaObj);
    if (dataValidate.error) {
        res.status(400).json({ message: dataValidate.error['details'][0]['message'] });
        return true;
    }
    return false;
}
exports.validationError = validationError;
function testMiddleWare(req, res) {
    console.log('testMiddleWare fired');
}
exports.testMiddleWare = testMiddleWare;
function isObjectId(value, helper) {
    if (!mongoose_1.isValidObjectId(value)) {
        return helper.error('any.invalid');
    }
    return value;
}
//# sourceMappingURL=index.js.map