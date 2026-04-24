const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastCompletedAt: { type: Date },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    walletAddress: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
