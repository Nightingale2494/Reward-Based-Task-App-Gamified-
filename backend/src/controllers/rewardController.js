const Reward = require('../models/Reward');
const User = require('../models/User');

const getRewards = async (req, res, next) => {
  try {
    const rewards = await Reward.find({ active: true }).sort({ cost: 1 });
    return res.json(rewards);
  } catch (error) {
    return next(error);
  }
};

const claimReward = async (req, res, next) => {
  try {
    const { rewardId } = req.body;
    const reward = await Reward.findById(rewardId);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });

    const user = await User.findById(req.user.userId);
    if (user.points < reward.cost) {
      return res.status(400).json({ message: 'Not enough points' });
    }

    user.points -= reward.cost;
    user.level = Math.max(1, Math.floor(user.points / 100) + 1);
    await user.save();

    return res.json({ message: 'Reward claimed', user, reward });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getRewards, claimReward };
