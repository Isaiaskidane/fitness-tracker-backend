const express = require('express');
const { addActivity, getActivities, updateActivity, deleteActivity } = require('../controllers/activityController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addActivity);
router.get('/', auth, getActivities);
router.put('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity);

module.exports = router;
