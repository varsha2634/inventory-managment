const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// User Sign-Up
exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'All fields (username, password, role) are required' });
    }

    // Check for valid role
    const validRoles = ['Admin', 'Manager', 'Staff'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: `Role must be one of ${validRoles.join(', ')}`});
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create new user
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, username, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Debugging: Log the received username
    console.log(`Received login request for username: ${username}`);

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      // User does not exist, return error
      return res.status(404).json({ message: 'User not found' });
    }

    // Debugging: Check if password comparison works
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Password does not match
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token in the response
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
