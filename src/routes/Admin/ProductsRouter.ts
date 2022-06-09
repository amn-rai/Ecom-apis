import { Router } from 'express';
import { uploadSingleFileToS3 } from '../../utils/fileUploadConfig';
const router: Router = Router();
import { addProduct, getProduct, getProducts, updateProduct } from '../../controllers/Admin/ProductsController';

router.post('/', uploadSingleFileToS3('product'), addProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/', updateProduct);

export default router;
