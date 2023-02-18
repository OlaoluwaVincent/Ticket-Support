import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: '',
};

//
// data is coming from the Front end Form
// Create Ticket
export const createTicket = createAsyncThunk(
	'tickets/create',
	async (ticketData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;

			// authService does the api call and returs the result or error
			return await ticketService.createTicket(ticketData, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get all of a user Ticket
export const getTickets = createAsyncThunk(
	'tickets/get',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;

			// authService does the api call and returs the result or error
			return await ticketService.getTickets(token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Get a ticket based on the ID
export const getTicket = createAsyncThunk(
	'tickets/getOne',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			// authService does the api call and returs the result or error
			return await ticketService.getTicket(ticketId, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Close a ticket based on the ID
export const closeTicket = createAsyncThunk(
	'tickets/close',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			// authService does the api call and returs the result or error
			return await ticketService.closeTicket(ticketId, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//
export const ticketSlice = createSlice({
	name: 'ticket',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(createTicket.fulfilled, (state, action) => {
				(state.isLoading = false), (state.isSuccess = true);
			})
			.addCase(createTicket.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload),
					(state.user = null);
			})
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(getTickets.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.tickets = action.payload);
			})
			.addCase(getTickets.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			})
			.addCase(getTicket.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(getTicket.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.ticket = action.payload);
			})
			.addCase(getTicket.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				(state.isLoading = false),
					state.tickets.map((ticket) =>
						ticket._id === action.payload._id
							? (ticket.status = 'closed')
							: ticket
					);
			});
	},
});

export const { reset } = ticketSlice.actions;

export default ticketSlice.reducer;
