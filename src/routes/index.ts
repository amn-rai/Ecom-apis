import { Router } from 'express';
import adminRouter from './Admin';
import authRouter from './Auth';
const router: Router = Router();

router.use('/admin', adminRouter);
router.use('/auth', authRouter);

export default router;
