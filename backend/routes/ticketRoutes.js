const express = require('express');
const router = express.Router();
const {
	createTickets,
	getTickets,
	getTicket,
	deleteTicket,
	updateTicket,
} = require('../controllers/ticketController');

// Reroute into Note

const { protect } = require('../middleware/authmiddleware');

const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTickets);
router
	.route('/:id')
	.get(protect, getTicket)
	.delete(protect, deleteTicket)
	.put(protect, updateTicket);

module.exports = router;
