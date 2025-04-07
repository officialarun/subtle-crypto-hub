import User from '../models/user.model.js';

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('balance profile referralCode')
      .populate('referredBy', 'phoneNumber');

    // Get referral count
    const referralCount = await User.countDocuments({ referredBy: req.user._id });

    res.json({
      balance: user.balance,
      profile: user.profile,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      referralCount
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get referral history
// @route   GET /api/dashboard/referrals
// @access  Private
export const getReferralHistory = async (req, res) => {
  try {
    const referrals = await User.find({ referredBy: req.user._id })
      .select('phoneNumber createdAt')
      .sort({ createdAt: -1 });

    res.json(referrals);
  } catch (error) {
    console.error('Get referral history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 