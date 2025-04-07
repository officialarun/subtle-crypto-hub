import User from '../models/user.model.js';

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, bankName, accountNumber, ifscCode, upiId, phoneNumber } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      // Update profile fields
      user.profile = {
        name: name || user.profile?.name || '',
        bankName: bankName || user.profile?.bankName || '',
        accountNumber: accountNumber || user.profile?.accountNumber || '',
        ifscCode: ifscCode || user.profile?.ifscCode || '',
        upiId: upiId || user.profile?.upiId || '',
        phoneNumber: phoneNumber || user.profile?.phoneNumber || ''
      };

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        profile: updatedUser.profile
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user password
// @route   PUT /api/user/password
// @access  Private
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user balance
// @route   GET /api/user/balance
// @access  Private
export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('balance');
    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 