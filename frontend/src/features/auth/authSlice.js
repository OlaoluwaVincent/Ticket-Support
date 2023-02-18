import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// /Get user from Local storage
const user = JSON.parse(sessionStorage.getItem('user'));

// Initial state or look of the variables needed in the App
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};
// User is coming from the Front end Form
// Register new User
export const register = createAsyncThunk(
	'registerUser',
	async (user, thunkAPI) => {
		try {
			// authService does the api call and returs the result or error
			return await authService.register(user);
		} catch (err) {
			const message = err.response.data.message;

			// this fecthe all the possible place our error could be and sends it to this #Thunk
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Login User
export const login = createAsyncThunk('loginUser', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (err) {
		const message = err.response.data.message;

		// this fecthe all the possible place our error could be and sends it to this #Thunk
		return thunkAPI.rejectWithValue(message);
	}
});

// Logout User
export const logout = createAsyncThunk('logoutUser', () => {
	return authService.logout();
});

// Initialize the SLICE to hold the data and its relatives actions
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(register.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.user = action.payload);
			})
			.addCase(register.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload),
					(state.user = null);
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			// Payload is the Data || Response we get back #ACTUAL DATA
			.addCase(login.fulfilled, (state, action) => {
				(state.isLoading = false),
					(state.isSuccess = true),
					(state.user = action.payload);
			})
			.addCase(login.rejected, (state, action) => {
				(state.isLoading = false),
					(state.isError = true),
					(state.message = action.payload),
					(state.user = null);
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
