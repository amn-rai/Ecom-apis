import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
function validationObj(method: string): any {
    switch (method) {
        case 'login': {
            return Joi.object({
                username: Joi.string()
                    .min(3)
                    .regex(new RegExp(`^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$`))
                    .required()
                    .messages({
                        'string.min': 'User Name must have at least 3 characters',
                        'string.pattern.base': 'User name is not valid'
                    }),
                password: Joi.string().min(6)
            });
        }
        case 'registerCompanyAdmin': {
            return Joi.object({
                email: Joi.string().email().required(),
                username: Joi.string()
                    .min(3)
                    .regex(new RegExp(`^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$`))
                    .required()
                    .messages({
                        'string.min': 'User Name must have at least 3 characters',
                        'string.pattern.base': 'User name is not valid'
                    }),
                // address: Joi.string(),
                firstName: Joi.string().min(3).max(100).required(),
                role: Joi.number().equal(1).required(),
                lastName: Joi.string().min(3).max(100).required(),
                phone: Joi.string().min(7).max(12).required(),
                designation: Joi.string().min(2).max(100).required()
            });
        }

        case 'userNameExist': {
            return Joi.object({
                username: Joi.string()
                    .min(3)
                    .lowercase()
                    .regex(new RegExp(`^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$`))
                    .required()
                    .messages({
                        'string.min': 'User Name must have at least 3 characters',
                        'string.pattern.base': 'User name is not valid'
                    })
            });
        }
        case 'getSingleDropdownData': {
            return Joi.object({
                model: Joi.string()
                    .valid(
                        'ageGroup',
                        'adTypes',
                        'country',
                        'demographics',
                        'industry',
                        'sentimentsTopic',
                        'religion',
                        'occupation',
                        'disability',
                        'mediaChannels',
                        'brands'
                    )
                    .required(),
                page: Joi.number().min(1),
                name: Joi.string()
            });
        }
        case 'sendForgotPasswordLink': {
            return Joi.object({
                email: Joi.string().email().required()
            });
        }
        case 'resetPassword': {
            return Joi.object({
                email: Joi.string().email().required(),
                token: Joi.string().required(),
                password: Joi.string().min(6).max(100).required()
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
