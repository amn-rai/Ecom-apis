import { Router } from 'express';
const router: Router = Router();
import { uploadSingleFileToS3 } from '../../utils/fileUploadConfig';
import { addCategory, getCategory, getCategorys, updateCategory } from '../../controllers/Admin/CategoryController';

router.post('/', uploadSingleFileToS3('logo'), addCategory);
router.get('/', getCategorys);
router.get('/:id', getCategory);
router.put('/', updateCategory);

export default router;
