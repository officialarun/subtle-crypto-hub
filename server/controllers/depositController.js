import Deposit from '../models/Deposit.js';
import User from '../src/models/user.model.js';

// Create a new deposit
export const createDeposit = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('User from request:', req.user);

    const { amount, utrNumber, upiId, paymentDate } = req.body;

    if (!req.user || !req.user._id) {
      const error = new Error('User not authenticated');
      error.status = 401;
      throw error;
    }

    // Validate required fields
    if (!amount || !utrNumber || !upiId || !paymentDate) {
      const error = new Error('Missing required fields');
      error.status = 400;
      throw error;
    }

    // Create new deposit
    const deposit = new Deposit({
      userId: req.user._id,
      phoneNumber: req.user.phoneNumber,
      amount,
      utrNumber,
      upiId,
      paymentDate: new Date(paymentDate),
      status: 'pending'
    });

    console.log('Deposit object to save:', deposit);

    await deposit.save();

    res.status(201).json({
      success: true,
      message: 'Deposit request created successfully',
      deposit
    });
  } catch (error) {
    console.error('Detailed error creating deposit:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    // If it's a validation error, send a 400 status
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }

    // If it's a duplicate key error, send a 409 status
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate entry',
        error: error.message
      });
    }

    // For other errors, use the error's status or default to 500
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Error creating deposit request',
      error: error.message
    });
  }
};

// Get all deposits
export const getAllDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find()
      .populate('userId', 'name phoneNumber')
      .sort({ paymentDate: -1 });

    res.status(200).json({
      success: true,
      deposits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching deposits',
      error: error.message
    });
  }
};

// Get deposits by user ID
export const getUserDeposits = async (req, res) => {
  try {
    const { userId } = req.params;
    const deposits = await Deposit.find({ userId })
      .sort({ paymentDate: -1 });

    res.status(200).json({
      success: true,
      deposits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user deposits',
      error: error.message
    });
  }
};

// Update deposit status
export const updateDepositStatus = async (req, res) => {
  try {
    const { depositId } = req.params;
    const { status } = req.body;

    const deposit = await Deposit.findById(depositId);
    if (!deposit) {
      return res.status(404).json({
        success: false,
        message: 'Deposit not found'
      });
    }

    // If status is being changed to approved, update user's balance
    if (status === 'approved' && deposit.status !== 'approved') {
      const user = await User.findById(deposit.userId);
      if (user) {
        user.balance += deposit.amount;
        await user.save();
      }
    }

    deposit.status = status;
    await deposit.save();

    res.status(200).json({
      success: true,
      message: 'Deposit status updated successfully',
      deposit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating deposit status',
      error: error.message
    });
  }
};

// Get deposit statistics
export const getDepositStats = async (req, res) => {
  try {
    const totalDeposits = await Deposit.countDocuments();
    const pendingDeposits = await Deposit.countDocuments({ status: 'pending' });
    const approvedDeposits = await Deposit.countDocuments({ status: 'approved' });
    const totalAmount = await Deposit.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalDeposits,
        pendingDeposits,
        approvedDeposits,
        totalAmount: totalAmount[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching deposit statistics',
      error: error.message
    });
  }
}; 