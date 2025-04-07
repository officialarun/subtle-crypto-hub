import express from 'express';
import { updateProfile, updatePassword, getBalance } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.get('/balance', protect, getBalance);

export default router; 