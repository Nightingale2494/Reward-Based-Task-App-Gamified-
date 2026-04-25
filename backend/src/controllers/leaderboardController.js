const User = require('../models/User');

const getLeaderboard = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({}, 'username points level streak')
        .sort({ points: -1, updatedAt: 1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments()
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: users
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getLeaderboard };
