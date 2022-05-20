import { Router } from 'express';
const router: Router = Router();
import { createCompany, getCompany, getCompanies, updateCompany } from '../../controllers/RTAdmin/CompanyController';

router.post('/', createCompany);
router.get('/', getCompanies);
router.get('/:id', getCompany);
router.put('/', updateCompany);

export default router;
