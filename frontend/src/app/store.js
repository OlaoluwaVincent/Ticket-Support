import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketSlice from '../features/tickets/ticketSlice';
import noteSlice from '../features/notes/noteSlice';
import adminSlice from '../features/admin/adminSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		tickets: ticketSlice,
		notes: noteSlice,
		admin: adminSlice,
	},
});
