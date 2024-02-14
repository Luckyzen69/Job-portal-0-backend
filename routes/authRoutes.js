// authRoutes.js
const express = require('express');
const router = express.Router();
const UserModel = require("../model/user");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const UserSchema = await UserModel('User', {
  username: String,
  email: String,
});
     
const User = model('User', UserSchema);


router.get(`/api/user/${user}`,async (req, res) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'shhhhh'); 


    const userId = req.params.id;

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
    console.log(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
