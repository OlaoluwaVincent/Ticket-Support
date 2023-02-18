const aysncController = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc   Create Tickets
// @route   POST /api/tickets
// @access  Private
////////////////////////////////////////////////////////////////////
const createTickets = aysncController(async (req, res) => {
	// Get the data from the user inputs
	const { product, description } = req.body;

	// If the are no user Input throw an error.
	if (!product || !description) {
		res.status(400);
		throw new Error('Please add a product and description');
	}

	// get User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user._id);
	// If there is no logged in user Throw an Error
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	// Creating the Ticket
	const ticket = await Ticket.create({
		product,
		description,
		user: req.user._id,
		status: 'new',
	});

	res.status(201).json(ticket);
});

// @desc    Get all User Tickets
// @route   GET /api/tickets
// @access  Private
////////////////////////////////////////////////////////////////////
const getTickets = aysncController(async (req, res) => {
	// get User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	const tickets = await Ticket.find({ user: req.user._id }).populate('user');
	res.status(200).json(tickets);
});

// @desc    Get Ticket
// @route   GET /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const getTicket = aysncController(async (req, res) => {
	// get User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	// Get ticket by the ID in the searchQuery
	const ticket = await Ticket.findById(req.params.id);
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

	res.status(200).json(ticket);
});

// @desc    Delete Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const deleteTicket = aysncController(async (req, res) => {
	// delete User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	// delete ticket by the ID in the searchQuery
	const ticket = await Ticket.findById(req.params.id);
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

	await Ticket.deleteOne();

	res.status(200).json({ success: true });
});

// @desc    update Ticket
// @route   PUT /api/tickets/:id
// @access  Private
////////////////////////////////////////////////////////////////////
const updateTicket = aysncController(async (req, res) => {
	// update User from the ID in the JWT-Token
	// req.user is gotten only the user is logged in and it set to the userData except password
	const user = await User.findById(req.user._id);
	if (!user) {
		res.status(401);
		throw new Error('User not authorised');
	}

	// update ticket by the ID in the searchQuery
	const ticket = await Ticket.findById(req.params.id);
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

	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);

	res.status(200).json(updatedTicket);
});

module.exports = {
	createTickets,
	getTickets,
	getTicket,
	deleteTicket,
	updateTicket,
};
