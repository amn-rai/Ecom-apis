import { Router } from 'express';
const router: Router = Router();
import { uploadSingleFileToLocal } from '../../utils/fileUploadConfig';
import {
    addSubCategory,
    getSubCategory,
    getSubCategorys,
    updateSubCategory
} from '../../controllers/Admin/SubCategoryController';

router.get('/', getSubCategorys);

export default router;
