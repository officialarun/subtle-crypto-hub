import mongoose from 'mongoose';

const depositSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  utrNumber: {
    type: String,
    required: true
  },
  upiId: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
depositSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Deposit = mongoose.model('Deposit', depositSchema);

export default Deposit; 