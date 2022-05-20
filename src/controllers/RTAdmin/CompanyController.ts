import { messages } from './../../utils/constants';
import { paginationFun } from './../../utils';
import { Request, Response } from 'express';
import { CompanyModel } from '../../models';
import { validationError } from '../../validators';
import { getIdFromToken } from '../Auth/AuthController';
class CompanyController {
    async createCompany(req: Request, res: Response) {
        try {
            if (validationError(req.body, 'createCompany', res)) return;
            const companyExist = await Company.checkCompanyExist({ name: req.body.name });

            if (companyExist) return res.status(400).json({ message: messages.COMPANY_EXISTS });

            await new CompanyModel(req.body).save();
            res.status(201).json({ message: messages.COMPANY_CREATED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getCompany(req: Request, res: Response) {
        try {
            if (validationError(req.params, 'getCompany', res)) return;
            const response = await CompanyModel.findById(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getCompanies(req: Request, res: Response) {
        try {
            const response = await paginationFun(CompanyModel, req.query, '-__v', []);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async updateCompany(req: Request, res: Response) {
        try {
            if (validationError({...req.body,...req.params}, 'createCompany', res)) return;

            const companyExist = await Company.checkCompanyExist({ name: req.body.name });

            if (companyExist) return res.status(400).json({ message: messages.COMPANY_EXISTS });

            await CompanyModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: messages.COMPANY_UPDATED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async checkCompanyExist(query: any) {
        query.name = query.name.toLowerCase();
        const response = await CompanyModel.findOne(query);
        return response ? true : false;
    }
}
const Company = new CompanyController();

export = Company;
