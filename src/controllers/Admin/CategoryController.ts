import { hashSync, genSaltSync } from 'bcryptjs';
import { messages } from '../../utils/constants';
import { paginationFun } from '../../utils';
import { Request, Response } from 'express';
import { CategoryModel } from '../../models';
import { validationError } from '../../validators';
import { getIdFromToken } from './Auth/AuthController';
class CategoryController {
    async addCategory(req, res) {
        try {
            if (validationError(req.body, 'AddCategory', res)) return;
            req.body.logo = req.file.location

            await new CategoryModel(req.body).save();
            res.status(200).json({ message: messages.Category_ADDED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }

    async getCategory(req: Request, res: Response) {
        try {
            if (validationError(req.params, 'getId', res)) return;
            const response = await CategoryModel.findById(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getCategorys(req: any, res: Response) {
        try {
            if (validationError(req.query, 'getCategories', res)) return;
            if (req.query.name) {
                req.query.name = new RegExp('^' + req.query.name, 'i');
            }
            const populate = [];
            const response = await paginationFun(CategoryModel, req.query, '-__v -createdAt -updatedAt', populate);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async updateCategory(req: Request, res: Response) {
        try {
            if (validationError({ ...req.body, ...req.params }, 'createCompany', res)) return;

            const companyExist = await Company.checkCompanyExist({ name: req.body.name });

            if (companyExist) return res.status(400).json({ message: messages.COMPANY_EXISTS });

            await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: messages.COMPANY_UPDATED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async checkCompanyExist(query: any) {
        query.name = query.name.toLowerCase();
        const response = await CategoryModel.findOne(query);
        return response ? true : false;
    }
}
const Company = new CategoryController();

export = Company;
