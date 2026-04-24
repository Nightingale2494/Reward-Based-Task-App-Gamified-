const express = require('express');
const auth = require('../middleware/auth');
const { getRewards, claimReward } = require('../controllers/rewardController');

const router = express.Router();

router.get('/', auth, getRewards);
router.post('/claim', auth, claimReward);

module.exports = router;
