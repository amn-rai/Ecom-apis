import { Router } from 'express';
import adminRouter from './Admin';
import authRouter from './Auth';
import usersRouter from './Users';
const router: Router = Router();

router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/user', usersRouter);

export default router;
