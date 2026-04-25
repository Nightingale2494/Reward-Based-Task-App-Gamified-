const Task = require('../models/Task');
const { applyTaskCompletionRewards } = require('../services/gamificationService');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.userId });
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

const completeTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.completed) return res.status(400).json({ message: 'Task already completed' });

    task.completed = true;
    task.completedAt = new Date();
    await task.save();

    const { user, newBadges } = await applyTaskCompletionRewards(req.user.userId, task.points);

    const io = req.app.get('io');
    io.emit('leaderboard:update');

    return res.json({ task, user, newBadges, xpGained: task.points });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
};
