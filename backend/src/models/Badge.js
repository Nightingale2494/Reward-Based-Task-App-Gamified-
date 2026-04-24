const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    criteria: { type: Number, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Badge', badgeSchema);
