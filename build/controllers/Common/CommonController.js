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
const validators_1 = require("../../validators");
const constants_1 = require("../../utils/constants");
const data_1 = require("../../models/data");
const utils_1 = require("../../utils");
class CommonController {
    getDropdowns(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.query, 'getDropdownData', res))
                    return;
                if (req.query.query) {
                    req.query = Object.assign(Object.assign({}, req.query), JSON.parse(req.query.query));
                    delete req.query.query;
                }
                const { name, model, page } = req.query;
                const models = {
                    countries: data_1.CountriesModel,
                    states: data_1.StatesModel
                };
                let response;
                if (name) {
                    req.query.name = new RegExp('^' + name, 'i');
                }
                delete req.query.model;
                console.log('req.query', req.query);
                const populateArray = [
                    {
                        path: 'country',
                        model: 'countries',
                        select: 'name'
                    }
                ];
                if (page) {
                    response = yield utils_1.paginationFun(models[model], req.query, 'name', populateArray);
                }
                else {
                    response = yield models[model].find(req.query, 'name').populate(populateArray);
                }
                res.status(200).json(response);
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
}
const CC = new CommonController();
module.exports = CC;
//# sourceMappingURL=CommonController.js.map