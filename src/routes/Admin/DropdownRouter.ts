import { Router } from 'express';
const router = Router();

// router.post('/addType', addType);
import {
    addDropdownsData,
    getSingleDropdownData,
    addSubDropdownsData,
    updateDropdownData
} from '../../controllers/Admin/DropdownController';
import { getDropdowns } from '../../controllers/Common/CommonController';
router.get('/', getDropdowns);
router.post('/', addDropdownsData);
router.post('/sub', addSubDropdownsData);
router.put('/:id', updateDropdownData);

export default router;
