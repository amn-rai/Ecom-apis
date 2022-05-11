import { Request, Response } from 'express';
import { CompanyModel } from '../../models';
import { validationError } from '../../validators';
class CompanyController {
    async createCompany(req: Request, res: Response) {
        if (validationError(req.body, 'createCompany', res)) return;
        await new CompanyModel().save();
    }
}
const Company = new CompanyController();

export = Company;
