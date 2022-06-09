import { hashSync, genSaltSync } from 'bcryptjs';
import { messages } from '../../utils/constants';
import { paginationFun } from '../../utils';
import { Request, Response } from 'express';
import { ProductModel } from '../../models/Products';
import { validationError } from '../../validators';
class ProductController {
    async getProduct(req: Request, res: Response) {
        try {
            if (validationError(req.params, 'getId', res)) return;
            const response = await ProductModel.findById(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
    async getProducts(req: Request, res: Response) {
        try {
            const populate = [
                {
                path:"category",
                model:"categories",
                select:"name"
            },
                {
                path:"subcategory",
                model:"subcategories",
                select:"name"
            },
        ];
            const response = await paginationFun(ProductModel, req.query, '-__v', populate);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: messages.SOMETHING_WRONG });
        }
    }
}
const Company = new ProductController();

export = Company;
