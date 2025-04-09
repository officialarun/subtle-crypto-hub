import express from 'express';
import { createDeposit, getUserDeposits, getDepositById } from '../controllers/deposit.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create a new deposit
router.post('/', createDeposit);

// Get all deposits for the authenticated user
router.get('/', getUserDeposits);

// Get a specific deposit by ID
router.get('/:id', getDepositById);

export default router; 