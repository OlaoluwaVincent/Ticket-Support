import axios from 'axios';

let URL;
if (process.env.NODE_ENV === 'development') {
	URL = 'http://localhost:5000/admin';
} else {
	URL = '/admin';
}

// Get a Ticket base off of an ID
const getAllUserTickets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(URL, config);
	return response.data;
};
// Get a Note base off of an TicketID
const getUserTicketbyId = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(`${URL}/ticket/` + ticketId, config);
	return response.data;
};
// Get user notes
const getUserNotesById = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(`${URL}/note/` + ticketId, config);
	return response.data;
};
// close user Ticket
const closeTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.put(
		`${URL}/ticket/` + ticketId,
		{ status: 'closed' },
		config
	);
	return response.data;
};
// Create Note
const createResponse = async (noteText, ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(
		`${URL}/note/` + ticketId,
		{ text: noteText },
		config
	);
	return response.data;
};

const adminService = {
	getAllUserTickets,
	getUserTicketbyId,
	closeTicket,
	getUserNotesById,
	createResponse,
};

export default adminService;
