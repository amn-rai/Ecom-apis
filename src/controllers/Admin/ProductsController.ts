import { hashSync, genSaltSync } from 'bcryptjs';
import { messages } from '../../utils/constants';
import { paginationFun } from '../../utils';
import { Request, Response } from 'express';
import { ProductModel } from '../../models/Products';
import { validationError } from '../../validators';
import { getIdFromToken } from './Auth/AuthController';
class ProductController {
    async addProduct(req, res) {
        try {
            if (validationError(req.body, 'AddProduct', res)) return;
            req.body.productimg = `/static/file/${req.file.filename}`;

            await new ProductModel(req.body).save();
            res.status(200).json({ message: messages.PRODUCT_ADDED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }

    async getProduct(req: Request, res: Response) {
        try {
            const response = await ProductModel.findById(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getProducts(req: any, res: Response) {
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
            const response = await paginationFun(ProductModel, req.query, '-__v', populate);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async updateProduct(req: Request, res: Response) {
        try {
            if (validationError({ ...req.body, ...req.params }, 'createCompany', res)) return;

            const companyExist = await Company.checkCompanyExist({ name: req.body.name });

            if (companyExist) return res.status(400).json({ message: messages.COMPANY_EXISTS });

            await ProductModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: messages.COMPANY_UPDATED });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async checkCompanyExist(query: any) {
        query.name = query.name.toLowerCase();
        const response = await ProductModel.findOne(query);
        return response ? true : false;
    }
}
const Company = new ProductController();

export = Company;
