const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/user-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  loginCount: { type: Number, default: 0 },
  lastLogin: Date,
});

// User Model
const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, gender });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      user.loginCount += 1;
      user.lastLogin = new Date();
      await user.save();
      res.json({
        name: user.name,
        email: user.email,
        gender: user.gender,
        loginCount: user.loginCount,
        lastLogin: user.lastLogin
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Admin Route to get all users
app.get('/api/admin', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});
// server.js
app.get('/api/admin', async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // login counts

  app.get('/api/loginCounts', async (req, res) => {
    try {
      const users = await User.find();
      const loginCounts = {};
  
      users.forEach(user => {
        const date = new Date(user.lastLogin).toISOString().split('T')[0];
        loginCounts[date] = (loginCounts[date] || 0) + 1;
      });
  
      const formattedCounts = Object.keys(loginCounts).map(date => ({
        date,
        count: loginCounts[date],
      }));
  
      res.json(formattedCounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Profile Route
app.get('/api/profile', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(401).json({ message: 'No userId, authorization denied' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
