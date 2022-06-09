import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
function validationObj(method: string): any {
    switch (method) {
        case 'login': {
            return Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6)
            });
        }
        case 'registerUser': {
            return Joi.object({
                email: Joi.string().email().required(),
                firstName: Joi.string().min(3).max(100).required(),
                lastName: Joi.string().min(3).max(100).required(),
                phone: Joi.string().min(7).max(12).required(),
                password: Joi.string().min(6).required()
            });
        }
        case 'get': {
            return Joi.object({
                id: Joi.custom(isObjectId).required()
            });
        }
        case 'getSubCategories': {
            return Joi.object({
                category: Joi.custom(isObjectId),
                page: Joi.number(),
                name: Joi.string()
            });
        }
        case 'getCategories': {
            return Joi.object({
                page: Joi.number(),
                name: Joi.string()
            });
        }

        case 'getDropdownData': {
            return Joi.object({
                model: Joi.string().valid('countries', 'states').required(),
                page: Joi.number().min(1),
                name: Joi.string(),
                query: Joi.string()
            });
        }
        case 'addData': {
            return Joi.object({
                name: Joi.string().required(),
                id: Joi.string().custom(isObjectId),
                model: Joi.string().valid('country').required()
            });
        }
        case 'addSubDropdownData': {
            return Joi.object({
                name: Joi.string().required(),
                subdropdownKey: Joi.string().valid('country').required(),
                subdropdownValue: Joi.string().custom(isObjectId).required(),
                model: Joi.string().valid('state').required()
            });
        }
        case 'sendForgotPasswordLink': {
            return Joi.object({
                email: Joi.string().email().required()
            });
        }
        case 'AddCategory': {
            return Joi.object({
                name: Joi.string().min(2).required()
            });
        }
        case 'AddSubCategory': {
            return Joi.object({
                name: Joi.string().min(2).required(),
                category: Joi.string().custom(isObjectId).required()
            });
        }
        case 'resetPassword': {
            return Joi.object({
                email: Joi.string().email().required(),
                token: Joi.string().required(),
                password: Joi.string().min(6).max(100).required()
            });
        }
        case 'AddProduct': {
            return Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                category: Joi.string().custom(isObjectId).required(),
                subcategory: Joi.string().custom(isObjectId).required(),
                price: Joi.number().required(),
                discount: Joi.number().required(),
                tax: Joi.number().required(),
                qunatity: Joi.number().required()
            });
        }
    }
}
function validationError(schemaObj: any, method: string, res: Response): boolean {
    const dataValidate = validationObj(method).validate(schemaObj);
    if (dataValidate.error) {
        res.status(400).json({ message: dataValidate.error['details'][0]['message'] });
        return true;
    }
    return false;
}
function testMiddleWare(req: any, res: any) {
    console.log('testMiddleWare fired');
}
function isObjectId(value, helper) {
    if (!isValidObjectId(value)) {
        return helper.error('any.invalid');
    }
    return value;
}

export { validationError, testMiddleWare };
