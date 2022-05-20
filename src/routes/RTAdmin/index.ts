import { Router } from 'express';
const router: Router = Router();

import CompanyRouter from './CompanyRouter';

router.use('/company', CompanyRouter);

export default router;
