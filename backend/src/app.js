const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/rewards', rewardRoutes);

app.use(errorHandler);

module.exports = app;
