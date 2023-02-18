import axios from 'axios';

let URL;
if (process.env.NODE_ENV === 'development') {
	URL = 'http://localhost:5000/api/tickets/';
} else {
	URL = '/api/tickets/';
}

// Create Ticket
const createTicket = async (userData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(URL, userData, config);
	return response.data;
};

// Get all of a user Ticket
const getTickets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(URL, config);
	return response.data;
};

// Get a Ticket base off of an ID
const getTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(URL + ticketId, config);
	return response.data;
};

// Delete a Ticket
const closeTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.put(
		URL + ticketId,
		{ status: 'closed' },
		config
	);
	return response.data;
};

const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	closeTicket,
};
export default ticketService;
