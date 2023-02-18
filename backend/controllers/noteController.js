const aysncController = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    Get Ticket
// @route   GET /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const getNotes = aysncController(async (req, res) => {
	// get User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	// Get ticket by the ID in the searchQuery
	const ticket = await Ticket.findById(req.params.ticketId);
	// If not ticket Throw an error
	if (!ticket) {
		res.status(401);
		throw new Error('Ticket not found');
	}
	// Ensure the user is the owner of that ticket
	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorised');
	}
	const notes = await Note.find({ ticket: req.params.ticketId }).populate({
		path: 'user',
	});

	res.status(200).json(notes);
});

// @desc    Create Ticket Note
// @route   POST  /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const addNote = aysncController(async (req, res) => {
	// get User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	// Get ticket by the ID in the searchQuery
	const ticket = await Ticket.findById(req.params.ticketId);
	// If not ticket Throw an error
	if (!ticket) {
		res.status(401);
		throw new Error('Ticket not found');
	}
	// Ensure the user is the owner of that ticket
	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorised');
	}
	const note = await Note.create({
		ticket: req.params.ticketId,
		text: req.body.text,
		isStaff: false,
		user: req.user.id,
	});

	res.status(200).json(note);
});

module.exports = {
	getNotes,
	addNote,
};
