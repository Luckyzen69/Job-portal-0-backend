// authRoutes.js
const express = require('express');
const router = express.Router();
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');


const User = await UserModel('User', {
  username: String,
  email: String,
});


router.get('/api/user/:id',async (req, res) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'shhhhh'); 


    const userId = req.params._id;

    // Perform validation on userId (e.g., validate format, ensure access permissions)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, filter or transform data before sending
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
