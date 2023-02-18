const express = require('express');
const router = express.Router();
const { registerUser, getMe, login } = require('../controllers/userController');

const { protect } = require('../middleware/authmiddleware');

// Register REQUEST
router.post('/register', registerUser);

// Login Routes
router.post('/login', login);

router.get('/me', protect, getMe);

//
module.exports = router;
