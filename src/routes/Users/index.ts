import { Router } from 'express';
const router: Router = Router();

import ProductsRouter from './ProductsRouter';
import CategoryRouter from './CategoryRouter';
import SubCategoryRouter from './SubCategoryRouter';

router.use('/product', ProductsRouter);
router.use('/category', CategoryRouter);
router.use('/subcategory', SubCategoryRouter);

export default router;
