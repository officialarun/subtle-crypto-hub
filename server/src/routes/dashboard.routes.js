import express from 'express';
import { getDashboardData, getReferralHistory } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getDashboardData);
router.get('/referrals', protect, getReferralHistory);

export default router; 