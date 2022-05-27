import { Router } from 'express';
const router: Router = Router();

import CompanyRouter from './CompanyRouter';
import DropdownRouter from './DropdownRouter';

router.use('/company', CompanyRouter);
router.use('/dropdowns', DropdownRouter);

export default router;
