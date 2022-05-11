import { Router } from 'express';
import { uploadSingleFileToS3, uploadSingleFileToLocal } from '../../utils/fileUploadConfig';
import { authenticate, login, registerUser } from '../../controllers/Auth/AuthController';
const router: Router = Router();
router.post('/login', login);
router.post('/register', registerUser);
export default router;
