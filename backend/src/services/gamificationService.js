const Badge = require('../models/Badge');
const User = require('../models/User');

const getLevelFromPoints = (points) => Math.max(1, Math.floor(points / 100) + 1);

const updateStreak = (lastCompletedAt, streak) => {
  if (!lastCompletedAt) return 1;

  const now = new Date();
  const previous = new Date(lastCompletedAt);
  const dayMs = 24 * 60 * 60 * 1000;

  const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const prevStart = new Date(previous.getFullYear(), previous.getMonth(), previous.getDate());

  const diffDays = Math.floor((nowStart - prevStart) / dayMs);

  if (diffDays === 0) return streak;
  if (diffDays === 1) return streak + 1;
  return 1;
};

const awardBadgesIfEligible = async (user) => {
  const badges = await Badge.find({ criteria: { $lte: user.points } });
  const existingBadgeIds = new Set(user.badges.map((id) => String(id)));
  const newBadges = badges.filter((badge) => !existingBadgeIds.has(String(badge._id)));

  if (newBadges.length > 0) {
    user.badges.push(...newBadges.map((badge) => badge._id));
    await user.save();
  }

  return newBadges;
};

const applyTaskCompletionRewards = async (userId, taskPoints) => {
  const user = await User.findById(userId);
  user.points += taskPoints;
  user.level = getLevelFromPoints(user.points);
  user.streak = updateStreak(user.lastCompletedAt, user.streak);
  user.lastCompletedAt = new Date();
  await user.save();

  const newBadges = await awardBadgesIfEligible(user);

  return { user, newBadges };
};

module.exports = {
  getLevelFromPoints,
  updateStreak,
  awardBadgesIfEligible,
  applyTaskCompletionRewards
};
