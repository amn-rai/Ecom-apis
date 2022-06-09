import { Router } from 'express';
import { uploadSingleFileToLocal } from '../../utils/fileUploadConfig';
const router: Router = Router();
import { addProduct, getProduct, getProducts, updateProduct } from '../../controllers/Admin/ProductsController';

router.post('/',uploadSingleFileToLocal("file"), addProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/', updateProduct);

export default router;
