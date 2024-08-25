const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration (Admin only)
router.post('/register', protect, adminOnly, registerUser);

// User login
router.post('/login', loginUser);

// Get logged-in user's profile
router.get('/profile', protect, getUserProfile);

// Update logged-in user's profile
router.put('/profile', protect, updateUserProfile);

module.exports = router;
