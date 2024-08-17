

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const activityRoutes = require('./routes/activities');
const authMiddleware = require('./middleware/auth'); 

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/activities', authMiddleware, activityRoutes); 

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
