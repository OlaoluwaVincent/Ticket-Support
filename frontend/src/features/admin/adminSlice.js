import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

const initialState = {
	tickets: [],
	ticket: {},
	notes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const getAllUserTickets = createAsyncThunk(
	'admin/getTickets',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await adminService.getAllUserTickets(token);
		} catch (error) {
			const message = error.response.data.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);
export const getUserTicketbyId = createAsyncThunk(
	'admin/getTicket',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await adminService.getUserTicketbyId(ticketId, token);
		} catch (error) {
			const message = error.response.data.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);
export const getUserNotesById = createAsyncThunk(
	'admin/getNotes',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await adminService.getUserNotesById(ticketId, token);
		} catch (error) {
			const message = error.response.data.message;
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
			return await adminService.closeTicket(ticketId, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Create a Ticket Note
export const createResponse = createAsyncThunk(
	'notes/creat',
	async ({ noteText, ticketId }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;

			// authService does the api call and returs the result or error
			return await adminService.createResponse(noteText, ticketId, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: { reset: (state) => initialState },
	extraReducers: (builder) => {
		builder
			.addCase(getAllUserTickets.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(getAllUserTickets.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.tickets = action.payload);
			})
			.addCase(getAllUserTickets.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			})
			.addCase(getUserTicketbyId.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(getUserTicketbyId.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					([state.ticket] = action.payload);
			})
			.addCase(getUserTicketbyId.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			})
			.addCase(getUserNotesById.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(getUserNotesById.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.notes = action.payload);
			})
			.addCase(getUserNotesById.rejected, (state, action) => {
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
			})
			.addCase(createResponse.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(createResponse.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					state.notes.push(action.payload);
			})
			.addCase(createResponse.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			});
	},
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
