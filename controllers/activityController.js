


const Activity = require('../models/Activity');

// Add a new activity
exports.addActivity = async (req, res) => {
  const { name, duration, date } = req.body; // Include date in request body

  try {
    // Create a new activity
    const newActivity = new Activity({
      user: req.user.id, // Ensure req.user.id is correctly set
      name,
      duration,
      date: date ? new Date(date) : new Date(), // Use provided date or current date
    });

    // Save the activity to the database
    const activity = await newActivity.save();
    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all activities for the logged-in user
exports.getActivities = async (req, res) => {
  try {
    // Find all activities for the user
    const activities = await Activity.find({ user: req.user.id });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an activity by ID
exports.updateActivity = async (req, res) => {
  const { name, duration, date } = req.body; // Include date in request body

  try {
    // Find the activity by ID
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: 'Activity not found' });
    }

    // Check if the user is authorized
    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the activity details
    activity.name = name || activity.name;
    activity.duration = duration || activity.duration;
    activity.date = date ? new Date(date) : activity.date; // Update date if provided

    // Save the updated activity
    await activity.save();
    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete an activity by ID
exports.deleteActivity = async (req, res) => {
  try {
    // Find the activity by ID
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ msg: 'Activity not found' });
    }

    // Check if the user is authorized
    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Remove the activity from the database
    await activity.remove();
    res.json({ msg: 'Activity removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
