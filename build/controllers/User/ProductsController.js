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
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.params, 'getId', res))
                    return;
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
                        path: "category",
                        model: "categories",
                        select: "name"
                    },
                    {
                        path: "subcategory",
                        model: "subcategories",
                        select: "name"
                    },
                ];
                const response = yield utils_1.paginationFun(Products_1.ProductModel, req.query, '-__v', populate);
                res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
}
const Company = new ProductController();
module.exports = Company;
//# sourceMappingURL=ProductsController.js.map