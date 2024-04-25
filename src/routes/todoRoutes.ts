import { Router } from 'express';
import { getAllDuties, createDuty, updateDuty, updateDutyTitle, deleteDuty } from '../controllers/todoController'; // Fixed import path

const router = Router();

router.get('/', getAllDuties);
router.post('/', createDuty);
router.put('/:id', updateDuty);
router.put('/update/:id', updateDutyTitle);
router.delete('/:id', deleteDuty);

export default router;
