import { hashSync, genSaltSync } from 'bcryptjs';
import { messages } from '../../utils/constants';
import { paginationFun } from '../../utils';
import { Request, Response } from 'express';
import { SubCategoryModel } from '../../models';
import { validationError } from '../../validators';
import { getIdFromToken } from './Auth/AuthController';
class SubCategoryController {
    async addSubCategory(req, res) {
        try {
            if (validationError(req.body, 'AddSubCategory', res)) return;
            req.body.logo = `/static/file/${req.file.filename}`;
            await new SubCategoryModel(req.body).save();
            res.status(200).json({ message: messages.SubCategory_ADDED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }

    async getSubCategory(req: Request, res: Response) {
        try {
            if (validationError(req.params, 'getId', res)) return;
            const response = await SubCategoryModel.findById(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getSubCategorys(req: any, res: Response) {
        try {
            if (validationError(req.query, 'getSubCategories', res)) return;
            if (req.query.name) {
                req.query.name = new RegExp('^' + req.query.name, 'i');
            }
            const populate = [{ path: 'category', model: 'categories', select: 'name logo' }];
            const response = await paginationFun(SubCategoryModel, req.query, '-__v -createdAt -updatedAt', populate);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async updateSubCategory(req: Request, res: Response) {
        try {
            if (validationError({ ...req.body, ...req.params }, 'createCompany', res)) return;

            const companyExist = await Company.checkCompanyExist({ name: req.body.name });

            if (companyExist) return res.status(400).json({ message: messages.COMPANY_EXISTS });

            await SubCategoryModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: messages.COMPANY_UPDATED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async checkCompanyExist(query: any) {
        query.name = query.name.toLowerCase();
        const response = await SubCategoryModel.findOne(query);
        return response ? true : false;
    }
}
const Company = new SubCategoryController();

export = Company;
