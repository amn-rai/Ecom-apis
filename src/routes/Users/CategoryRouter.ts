import { Router } from 'express';
const router: Router = Router();
import { uploadSingleFileToLocal } from '../../utils/fileUploadConfig';
import { getCategorys } from '../../controllers/Admin/CategoryController';

router.get('/', getCategorys);

export default router;
