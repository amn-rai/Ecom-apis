import { Router } from 'express';
const router: Router = Router();
import { addProduct, getProduct, getProducts, updateProduct } from '../../controllers/Admin/ProductsController';

router.get('/', getProducts);
router.get('/:id', getProduct);

export default router;
