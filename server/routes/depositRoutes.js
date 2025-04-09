import express from 'express';
import { protect } from '../src/middleware/auth.middleware.js';
import {
  createDeposit,
  getAllDeposits,
  getDepositStats,
  updateDepositStatus,
  getUserDeposits
} from '../controllers/depositController.js';

const router = express.Router();

// Admin routes
router.get('/admin', protect, getAllDeposits);
router.get('/admin/stats', protect, getDepositStats);
router.put('/admin/:depositId/status', protect, updateDepositStatus);

// User routes
router.post('/', protect, createDeposit);
router.get('/user/:userId', protect, getUserDeposits);

export default router; 