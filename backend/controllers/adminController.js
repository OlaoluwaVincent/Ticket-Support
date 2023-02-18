const aysncController = require('express-async-handler');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');
const { isValidObjectId } = require('mongoose');

// @desc    Get ALL Ticket
// @route   GET /admin
// @access  Private
////////////////////////////////////////////////////////////////////
const getAllTickets = aysncController(async (req, res) => {
	// If the Logged in user is an admin do these functions
	if (req.user.isAdmin) {
		const admin = await User.find({ isAdmin: true });

		if (!admin) {
			res.status(401);
			throw new Error('Items not found');
		}

		// fetch all the tickets and its corresponding User
		const userTickets = await Ticket.find().populate({ path: 'user' });
		if (!userTickets) {
			res.status(401);
			throw new Error('NO TICKETS');
		}

		// returnt the tickets and its corresponding user
		res.status(200).json(userTickets);
	} else {
		res.status(401);
		throw new Error('Bad Request');
	}
});

// @desc    get ticket notes
// @route   PUT /admin/:ticketId
// @access  Private
////////////////////////////////////////////////////////////////////
const ticketNote = aysncController(async (req, res) => {
	// If the Logged in user is an admin do these functions
	if (req.user.isAdmin) {
		const admin = await User.find({ isAdmin: true });

		if (!admin) {
			res.status(401);
			throw new Error('Items not found');
		}
		if (!isValidObjectId(req.params.id)) {
			res.status(401);
			throw new Error('Invalid');
		}
		// fetch all the Notes through the ticket ID
		const userNote = await Note.find({
			ticket: req.params.id,
		}).populate({ path: 'user' });

		if (!userNote) {
			res.status(401);
			throw new Error('No notes for this Ticket');
		}

		// returnt the tickets and its corresponding user
		res.status(200).json(userNote);
	} else {
		res.status(401);
		throw new Error('Bad Request');
	}
});
// @desc    get ticket notes
// @route   PUT /admin/:ticketId
// @access  Private
////////////////////////////////////////////////////////////////////
const getTicketbyId = aysncController(async (req, res) => {
	// If the Logged in user is an admin do these functions
	if (req.user.isAdmin) {
		const admin = await User.find({ isAdmin: true });

		if (!admin) {
			res.status(401);
			throw new Error('Items not found');
		}
		if (!isValidObjectId(req.params.id)) {
			res.status(401);
			throw new Error('Invalid Ticket');
		}

		// fetch all the Notes through the ticket ID
		const ticketNote = await Ticket.find({
			_id: req.params.id,
		});

		if (!ticketNote) {
			res.status(401);
			throw new Error('No notes for this Ticket');
		}

		// returnt the tickets and its corresponding user
		res.status(200).json(ticketNote);
	} else {
		res.status(401);
		throw new Error('Bad Request');
	}
});

// @desc    update Ticket
// @route   PUT /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const updateUserNote = aysncController(async (req, res) => {
	// If the Logged in user is an admin do these functions
	if (req.user.isAdmin) {
		const admin = await User.find({ isAdmin: true });

		if (!admin) {
			res.status(401);
			throw new Error('Items not found');
		}
		if (!isValidObjectId(req.params.id)) {
			res.status(401);
			throw new Error('Invalid Ticket Note');
		}
		// update ticket by the ID in the searchQuery
		const note = await Note.find({ ticket: req.params.id });
		// If not ticket Throw an error

		if (!note || note === []) {
			res.status(401);
			throw new Error('Unidentified Note');
		}

		const { staffResponse } = req.body;

		const newNote = await Note.create({
			staffResponse: req.body.text,
			isStaff: true,
			ticket: mongoose.Types.ObjectId(req.params.id),
			user: req.user._id,
			status: 'new',
		});

		res.status(200).json(newNote);
	} else {
		res.status(401);
		throw new Error('Unathorised Route');
	}
});

// @desc    update Ticket
// @route   PUT /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const updateTicket = aysncController(async (req, res) => {
	// If the Logged in user is an admin do these functions
	if (req.user.isAdmin) {
		const admin = await User.find({ isAdmin: true });

		if (!admin) {
			res.status(401);
			throw new Error('Items not found');
		}
		if (!isValidObjectId(req.params.id)) {
			res.status(401);
			throw new Error('Invalid Ticket Note');
		}
		// update ticket by the ID in the searchQuery
		const ticket = await Ticket.findById(req.params.id);
		// If not ticket Throw an error
		if (!ticket) {
			res.status(401);
			throw new Error('Unidentified Ticket');
		}

		const updatedTicket = await Ticket.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		res.status(200).json(updatedTicket);
	} else {
		res.status(401);
		throw new Error('Unathorised Route');
	}
});

module.exports = {
	getAllTickets,
	ticketNote,
	updateUserNote,
	getTicketbyId,
	updateTicket,
};
