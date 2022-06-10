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
const constants_1 = require("../../utils/constants");
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const validators_1 = require("../../validators");
class SubCategoryController {
    addSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.body, 'AddSubCategory', res))
                    return;
                // req.body.logo = req.file.location;
                req.body.logo = `/static/file/${req.file.filename}`;
                ;
                yield new models_1.SubCategoryModel(req.body).save();
                res.status(200).json({ message: constants_1.messages.SubCategory_ADDED });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    getSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.params, 'getId', res))
                    return;
                const response = yield models_1.SubCategoryModel.findById(req.params.id);
                res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    getSubCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.query, 'getSubCategories', res))
                    return;
                if (req.query.name) {
                    req.query.name = new RegExp('^' + req.query.name, 'i');
                }
                const populate = [{ path: 'category', model: 'categories', select: 'name logo' }];
                const response = yield utils_1.paginationFun(models_1.SubCategoryModel, req.query, '-__v -createdAt -updatedAt', populate);
                res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    updateSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(Object.assign(Object.assign({}, req.body), req.params), 'createCompany', res))
                    return;
                const companyExist = yield Company.checkCompanyExist({ name: req.body.name });
                if (companyExist)
                    return res.status(400).json({ message: constants_1.messages.COMPANY_EXISTS });
                yield models_1.SubCategoryModel.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json({ message: constants_1.messages.COMPANY_UPDATED });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    checkCompanyExist(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query.name = query.name.toLowerCase();
            const response = yield models_1.SubCategoryModel.findOne(query);
            return response ? true : false;
        });
    }
}
const Company = new SubCategoryController();
module.exports = Company;
//# sourceMappingURL=SubCategoryController.js.map