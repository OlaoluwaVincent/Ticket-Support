import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import LoadingState from './LoadingState';
import PrivateRoute from './PrivateRoute';

const AdminLock = () => {
	const { checkingStatus, isAdmin } = useAuthStatus();

	if (checkingStatus) {
		return <LoadingState />;
	}

	return isAdmin ? <Outlet /> : <Navigate to='/login' />;
};

export default AdminLock;
