import { Router } from 'express';
import { uploadSingleFileToS3, uploadSingleFileToLocal } from '../../utils/fileUploadConfig';
import { authenticate, login, registerUser, getUserProfile } from '../../controllers/Auth/AuthController';

const router: Router = Router();
router.get('/profile', authenticate, getUserProfile);
router.post('/login', login);
router.post('/register', registerUser);
export default router;
