import { Router } from 'express';
const router: Router = Router();
import { uploadSingleFileToLocal } from "../../utils/fileUploadConfig";
import { addCategory, getCategory, getCategorys, updateCategory } from '../../controllers/Admin/CategoryController';

router.post('/',uploadSingleFileToLocal('logo'), addCategory);
router.get('/', getCategorys);
router.get('/:id', getCategory);
router.put('/', updateCategory);

export default router;
