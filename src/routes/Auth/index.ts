import { Router } from 'express';
import { uploadSingleFileToS3 } from '../../utils/fileUploadConfig';
import { authenticate, login, registerUser, getUserProfile } from '../../controllers/User/Auth/AuthController';

const router: Router = Router();
router.get('/profile', authenticate, getUserProfile);
router.post('/login', login);
router.post('/register',uploadSingleFileToS3('profilePic'), registerUser);
export default router;
