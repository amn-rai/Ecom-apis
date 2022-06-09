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
const data_1 = require("../../models/data");
const constants_1 = require("../../utils/constants");
const utils_1 = require("../../utils");
class DropdownController {
    addDropdownsData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.body, 'addData', res))
                    return;
                const { name, model } = req.body;
                const models = {
                    country: data_1.CountriesModel
                };
                const result = yield models[model].findOne({
                    name: new RegExp('^' + name + '$', 'i')
                });
                if (result) {
                    return res.status(400).json({ message: `${model} already exists.` });
                }
                const modelZ = new models[model]({
                    name
                });
                yield modelZ.save();
                res.json({ message: `${model} added successfully.` });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    addSubDropdownsData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.body, 'addSubDropdownData', res))
                    return;
                const { name, model, subdropdownKey, subdropdownValue } = req.body;
                const models = {
                    state: data_1.StatesModel
                };
                const result = yield models[model].findOne({
                    name: new RegExp('^' + name + '$', 'i')
                });
                if (result) {
                    return res.status(400).json({ message: `${model} already exists.` });
                }
                const modelZ = new models[model]({
                    name
                });
                modelZ[subdropdownKey] = subdropdownValue;
                yield modelZ.save();
                res.json({ message: `${model} added successfully.` });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    updateDropdownData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(Object.assign(Object.assign({}, req.body), req.params), 'addData', res))
                    return;
                const { name, model } = req.body;
                const models = {
                    country: data_1.CountriesModel
                };
                const result = yield models[model].findOne({
                    name: new RegExp('^' + name + '$', 'i'),
                    _id: { $ne: req.params.id }
                });
                if (result) {
                    return res.status(400).json({ message: `${model} already exists.` });
                }
                yield models[model].findByIdAndUpdate(req.params.id, { name });
                res.json({ message: `${model} updated successfully.` });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
    getSingleDropdownData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (validators_1.validationError(req.query, 'getSingleDropdownData', res))
                    return;
                let { model } = req.query;
                model = model.toString();
                const models = {
                    country: data_1.CountriesModel
                };
                const query = {
                    page: req.query.page
                };
                if (req.query.name) {
                    query.name = new RegExp('^' + req.query.name, 'i');
                }
                const populateArray = [];
                const result = yield utils_1.paginationFun(models[model], query, ' -updatedAt -__v -password', populateArray);
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                res.status(400).json({ message: constants_1.messages.SOMETHING_WRONG });
            }
        });
    }
}
const DC = new DropdownController();
module.exports = DC;
//# sourceMappingURL=DropdownController.js.map