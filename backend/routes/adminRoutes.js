const express = require('express');
const router = express.Router({ mergeParams: true });
const {
	getAllTickets,
	ticketNote,
	updateUserNote,
	getTicketbyId,
	updateTicket,
} = require('../controllers/adminController');

const { protect } = require('../middleware/authmiddleware');

router.get('/', protect, getAllTickets);
router.route('/note/:id').get(protect, ticketNote).put(protect, updateUserNote);
router
	.route('/ticket/:id')
	.get(protect, getTicketbyId)
	.put(protect, updateTicket);

module.exports = router;
