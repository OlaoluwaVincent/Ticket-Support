import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { logout, reset as userReset } from '../features/auth/authSlice';
import { reset as adminReset } from '../features/admin/adminSlice';
import { reset as noteReset } from '../features/notes/noteSlice';
const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const onLogout = () => {
		dispatch(adminReset());
		dispatch(noteReset());
		dispatch(userReset());
		dispatch(logout());
		navigate('/');
	};
	return (
		<header className='header'>
			<div className='logo'>
				<Link to={user && user.isAdmin ? '/admin' : '/'}>
					Support Desk
				</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className='btn btn-block' onClick={onLogout}>
							<FaSignOutAlt />
							Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to={'/login'}>
								<FaSignInAlt />
								Login
							</Link>
						</li>
						<li>
							<Link to={'/register'}>
								<FaSignOutAlt />
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};

export default Header;
