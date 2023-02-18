const aysncController = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// models
const User = require('../models/userModel');

// Generate Web Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

// @desc    Register a new User
// @route   /api/users
// @access  Public
////////////////////////////////////////////////////////////////////
const registerUser = aysncController(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name && !email && !password) {
		res.status(400);
		throw new Error('Please include all fields');
	}

	// Find if user already exist via email
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create User
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid User Credentials');
	}

	// End of REGISTER USER
});

// @desc    Login a User
// @route   /api/users/login
// @access  Public
////////////////////////////////////////////////////////////////////

const login = aysncController(async (req, res) => {
	const { email, password } = req.body;
	// check and return user if email matches
	const user = await User.findOne({ email });

	if (user) {
		// 	// check user passwords
		const chkPassword = await bcrypt.compare(password, user.password);
		if (user && chkPassword) {
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
				isAdmin: user.email === 'admin@gmail.com' ? true : false,
			});
		} else {
			res.status(400);
			throw new Error('Invalid Email or Password');
		}
		// Wrong email
	} else {
		res.status(400);
		throw new Error('Invalid Email or Password');
	}
});

// @desc    Get current user
// @route   /api/users/me
// @access  private
////////////////////////////////////////////////////////////////////
const getMe = aysncController(async (req, res) => {
	const user = {
		id: req.user._id,
		email: req.user.email,
		name: req.user.name,
	};
	res.status(200).json(user);
});

module.exports = {
	registerUser,
	getMe,
	login,
};
