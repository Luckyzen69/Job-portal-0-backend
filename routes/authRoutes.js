// authRoutes.js
const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  // Check your authentication logic here
  // For example, verify the authentication token
  // If authenticated, continue to the next middleware, otherwise, send a 401 Unauthorized response
  // Note: This is a placeholder, replace it with your actual authentication logic
  const isAuthenticated = true; // Replace with your actual logic
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Route to get user information
router.get('/api/user', isAuthenticated, (req, res) => {
  // Assuming you have the user information stored in req.user after authentication

  const user = {
    id: req.user.id ,
    username: req.user.username ,  
    email: req.user.email,
  };
  res.json(user);
});

module.exports = router;
