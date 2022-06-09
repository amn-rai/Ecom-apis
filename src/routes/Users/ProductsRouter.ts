import { Router } from 'express';
const router: Router = Router();
import { addProduct, getProduct, getProducts, updateProduct } from '../../controllers/Admin/ProductsController';

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/', updateProduct);

export default router;
