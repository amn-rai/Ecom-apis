import { Router } from 'express';
const router = Router();

// router.post('/addType', addType);
import { addDropdownsData, getSingleDropdownData, updateDropdownData } from '../../controllers/RTAdmin/DropdownController';
import {  getDropdowns } from '../../controllers/Common/CommonController';
router.get('/', getDropdowns);
router.post('/', addDropdownsData);
router.put('/:id', updateDropdownData);

export default router;
