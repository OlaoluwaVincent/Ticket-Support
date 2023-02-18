import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

// /Get user from Local storage
const user = JSON.parse(localStorage.getItem('user'));

// Initial state or look of the variables needed in the App
const initialState = {
	notes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};
//

// Get all of a user Notes
export const getNotes = createAsyncThunk(
	'notes/get',
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;

			// authService does the api call and returs the result or error
			return await noteService.getNotes(ticketId, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Create a Ticket Note
export const createNote = createAsyncThunk(
	'notes/creat',
	async ({ noteText, ticketId }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;

			// authService does the api call and returs the result or error
			return await noteService.createNote(noteText, ticketId, token);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//
export const noteSlice = createSlice({
	name: 'note',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(getNotes.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.notes = action.payload);
			})
			.addCase(getNotes.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			})
			.addCase(createNote.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(createNote.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					state.notes.push(action.payload);
			})
			.addCase(createNote.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload);
			});
	},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
