import { Router } from 'express';
import { uploadSingleFileToLocal } from '../../utils/fileUploadConfig';
import { authenticate, login, registerUser, getUserProfile } from '../../controllers/User/Auth/AuthController';

const router: Router = Router();
router.get('/profile', authenticate, getUserProfile);
router.post('/login', login);
router.post('/register',uploadSingleFileToLocal('profilePic'), registerUser);
export default router;
