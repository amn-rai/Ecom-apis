import { Router } from 'express';
const router: Router = Router();
import { uploadSingleFileToS3 } from '../../utils/fileUploadConfig';
import {
    addSubCategory,
    getSubCategory,
    getSubCategorys,
    updateSubCategory
} from '../../controllers/Admin/SubCategoryController';

router.post('/', uploadSingleFileToS3('logo'), addSubCategory);
router.get('/', getSubCategorys);
router.get('/:id', getSubCategory);
router.put('/', updateSubCategory);

export default router;
