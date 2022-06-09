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
const Products_1 = require("../../models/Products");
const validators_1 = require("../../validators");
class ProductController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.body, 'AddProduct', res))
                    return;
                req.body.productimg = `/static/file/${req.file.filename}`;
                yield new Products_1.ProductModel(req.body).save();
                res.status(200).json({ message: constants_1.messages.PRODUCT_ADDED });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield Products_1.ProductModel.findById(req.params.id);
                res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const populate = [
                    {
                        path: 'category',
                        model: 'categories',
                        select: 'name'
                    },
                    {
                        path: 'subcategory',
                        model: 'subcategories',
                        select: 'name'
                    }
                ];
                if (req.query.name) {
                    req.query.name = new RegExp('^' + req.query.name, 'i');
                }
                const response = yield utils_1.paginationFun(Products_1.ProductModel, req.query, '-__v', populate);
                res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(Object.assign(Object.assign({}, req.body), req.params), 'createCompany', res))
                    return;
                const companyExist = yield Company.checkCompanyExist({ name: req.body.name });
                if (companyExist)
                    return res.status(400).json({ message: constants_1.messages.COMPANY_EXISTS });
                yield Products_1.ProductModel.findByIdAndUpdate(req.params.id, req.body);
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
            const response = yield Products_1.ProductModel.findOne(query);
            return response ? true : false;
        });
    }
}
const Company = new ProductController();
module.exports = Company;
//# sourceMappingURL=ProductsController.js.map