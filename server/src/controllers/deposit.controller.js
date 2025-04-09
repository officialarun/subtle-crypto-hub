import Deposit from '../models/deposit.model.js';

export const createDeposit = async (req, res) => {
  try {
    const { amount, utr, upiId, qrCodeUsed } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    // Check if UTR already exists
    const existingDeposit = await Deposit.findOne({ utr });
    if (existingDeposit) {
      return res.status(400).json({ message: 'This UTR has already been used' });
    }

    const deposit = new Deposit({
      userId,
      amount,
      utr,
      upiId,
      qrCodeUsed,
      status: 'pending'
    });

    await deposit.save();

    res.status(201).json({
      message: 'Deposit request submitted successfully',
      deposit
    });
  } catch (error) {
    console.error('Error creating deposit:', error);
    res.status(500).json({ message: 'Error processing deposit request' });
  }
};

export const getUserDeposits = async (req, res) => {
  try {
    const userId = req.user._id;
    const deposits = await Deposit.find({ userId })
      .sort({ createdAt: -1 });

    res.json(deposits);
  } catch (error) {
    console.error('Error fetching deposits:', error);
    res.status(500).json({ message: 'Error fetching deposits' });
  }
};

export const getDepositById = async (req, res) => {
  try {
    const deposit = await Deposit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deposit) {
      return res.status(404).json({ message: 'Deposit not found' });
    }

    res.json(deposit);
  } catch (error) {
    console.error('Error fetching deposit:', error);
    res.status(500).json({ message: 'Error fetching deposit' });
  }
}; 