import { Router } from 'express';
const router: Router = Router();

import ProductsRouter from './ProductsRouter';
import DropdownRouter from './DropdownRouter';
import CategoryRouter from './CategoryRouter';
import SubCategoryRouter from './SubCategoryRouter';

router.use('/Product', ProductsRouter);
router.use('/dropdowns', DropdownRouter);
router.use('/category', CategoryRouter);
router.use('/subcategory', SubCategoryRouter);

export default router;
