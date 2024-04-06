import express from 'express';
import { createTip, getAllTips, getTipById} from '../controllers/Tip.controller.js';

const router = express.Router();

router.route('/getAll').get(getAllTips);
router.route('/create').post(createTip);
router.route('/:id').get(getTipById);

export default router;