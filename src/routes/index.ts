import { Router } from 'express';
import rtAdminRouter from './RTAdmin';
import authRouter from './Auth';
const router: Router = Router();

router.use('/rtAdmin', rtAdminRouter);
router.use('/auth', authRouter);

export default router;
