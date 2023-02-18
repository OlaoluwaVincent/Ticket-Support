import axios from 'axios';

let URL;
if (process.env.NODE_ENV === 'development') {
	URL = 'http://localhost:5000/api/tickets/';
} else {
	URL = '/api/tickets/';
}

// Get a Ticket base off of an ID
const getNotes = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${URL}${ticketId}/notes`, config);
	return response.data;
};

// Create Note
const createNote = async (noteText, ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		`${URL}${ticketId}/notes`,
		{ text: noteText },
		config
	);
	return response.data;
};

//
const noteService = {
	getNotes,
	createNote,
};
export default noteService;
