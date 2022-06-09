import { Request, Response } from 'express';
import { validationError } from '../../validators';
import { CountriesModel, StatesModel } from '../../models/data';
import { messages, constants } from '../../utils/constants';
import { paginationFun } from '../../utils';

class DropdownController {
    async addDropdownsData(req: Request, res: Response) {
        try {
            if (validationError(req.body, 'addData', res)) return;
            const { name, model } = req.body;
            const models = {
                country: CountriesModel
            };

            const result = await models[model].findOne({
                name: new RegExp('^' + name + '$', 'i')
            });

            if (result) {
                return res.status(400).json({ message: `${model} already exists.` });
            }
            const modelZ = new models[model]({
                name
            });
            await modelZ.save();
            res.json({ message: `${model} added successfully.` });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async addSubDropdownsData(req: Request, res: Response) {
        try {
            if (validationError(req.body, 'addSubDropdownData', res)) return;
            const { name, model, subdropdownKey, subdropdownValue } = req.body;
            const models = {
                state: StatesModel
            };

            const result = await models[model].findOne({
                name: new RegExp('^' + name + '$', 'i')
            });

            if (result) {
                return res.status(400).json({ message: `${model} already exists.` });
            }
            const modelZ = new models[model]({
                name
            });
            modelZ[subdropdownKey] = subdropdownValue;
            await modelZ.save();
            res.json({ message: `${model} added successfully.` });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async updateDropdownData(req: Request, res: Response) {
        try {
            if (validationError({ ...req.body, ...req.params }, 'addData', res)) return;
            const { name, model } = req.body;
            const models = {
                country: CountriesModel
            };

            const result = await models[model].findOne({
                name: new RegExp('^' + name + '$', 'i'),
                _id: { $ne: req.params.id }
            });

            if (result) {
                return res.status(400).json({ message: `${model} already exists.` });
            }
            await models[model].findByIdAndUpdate(req.params.id, { name });
            res.json({ message: `${model} updated successfully.` });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getSingleDropdownData(req: Request, res: Response) {
        try {
            if (validationError(req.query, 'getSingleDropdownData', res)) return;
            let { model } = req.query;
            model = model.toString();
            const models = {
                country: CountriesModel
            };
            const query: any = {
                page: req.query.page
            };
            if (req.query.name) {
                query.name = new RegExp('^' + req.query.name, 'i');
            }
            const populateArray = [];
            const result: any = await paginationFun(models[model], query, ' -updatedAt -__v -password', populateArray);
            res.status(200).json(result);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
}
const DC = new DropdownController();
export = DC;
