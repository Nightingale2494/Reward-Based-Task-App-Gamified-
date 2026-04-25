require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Task = require('../src/models/Task');
const Badge = require('../src/models/Badge');
const Reward = require('../src/models/Reward');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Task.deleteMany({}),
    Badge.deleteMany({}),
    Reward.deleteMany({})
  ]);

  const badges = await Badge.insertMany([
    { name: 'Rookie', icon: '🥉', criteria: 50, description: 'Earn 50 points' },
    { name: 'Grinder', icon: '🥈', criteria: 200, description: 'Earn 200 points' },
    { name: 'Legend', icon: '🥇', criteria: 500, description: 'Earn 500 points' }
  ]);

  const password = await bcrypt.hash('Password123!', 10);

  const users = await User.insertMany([
    { username: 'neon_nova', email: 'nova@example.com', password, points: 180, level: 2, streak: 4, badges: [badges[0]._id] },
    { username: 'stellar_sam', email: 'sam@example.com', password, points: 320, level: 4, streak: 9, badges: [badges[0]._id, badges[1]._id] },
    { username: 'cosmo_kai', email: 'kai@example.com', password, points: 90, level: 1, streak: 2, badges: [badges[0]._id] }
  ]);

  await Task.insertMany([
    { title: 'Hydrate 2L', description: 'Drink enough water', type: 'daily', points: 20, userId: users[0]._id },
    { title: 'Workout 30 mins', description: 'Do strength training', type: 'daily', points: 30, userId: users[0]._id },
    { title: 'Plan week goals', description: 'List top 3 outcomes', type: 'weekly', points: 40, userId: users[1]._id }
  ]);

  await Reward.insertMany([
    { name: 'Mystery Chest', description: 'Random boost reward', cost: 100 },
    { name: 'Streak Shield', description: 'Protect streak for a day', cost: 150 },
    { name: 'Theme Unlock', description: 'Unlock custom neon theme', cost: 250 }
  ]);

  console.log('Seed complete. Demo user login: nova@example.com / Password123!');
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
