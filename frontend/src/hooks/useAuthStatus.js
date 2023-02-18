import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user && user.isAdmin) {
			setIsAdmin(true);
			setLoggedIn(false);
		} else if (user && !user.isAdmin) {
			setLoggedIn(true);
			setIsAdmin(false);
		}
		setCheckingStatus(false);
	}, [user]);
	return { loggedIn, checkingStatus, isAdmin };
};
