import { validationError } from '../../validators';
import { Response, Request } from 'express';
import { messages } from '../../utils/constants';
import { CountriesModel, StatesModel } from '../../models/data';
import { paginationFun } from '../../utils';
class CommonController {
    async getDropdowns(req: any, res: Response) {
        try {
            if (validationError(req.query, 'getDropdownData', res)) return;

            if (req.query.query) {
                req.query = { ...req.query, ...JSON.parse(req.query.query) };
                delete req.query.query;
            }
            const { name, model, page } = req.query;
            const models = {
                countries: CountriesModel,
                states: StatesModel
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
                response = await paginationFun(models[model], req.query, 'name', populateArray);
            } else {
                response = await models[model].find(req.query, 'name').populate(populateArray);
            }
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
}
const CC = new CommonController();
export = CC;
 