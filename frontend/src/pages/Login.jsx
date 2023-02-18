import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../components/LoadingState';

// Connecting to the Store
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	// Init dispatch to make our Functions in the Slice available
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Recieve and set the values from the form
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// Destructuring the data on #formData
	const { email, password } = formData;

	const onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};

	// Init the Selector to use the named state #auth which is the name...
	// of my SLICE and all the variables define in it
	const { user, isLoading, isSuccess, message, isError } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// Redirect when Register in

		if (isSuccess && user.isAdmin) {
			navigate('/admin');
		} else if (isSuccess && !user.isAdmin) {
			navigate('/');
		}
		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	if (isLoading) {
		return <LoadingState />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please Log in to get support</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							onChange={handleChange}
							required
							placeholder='1234@gmail.com'
						/>
					</div>
					<div className='form-group'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={handleChange}
							required
							placeholder='Enter Password'
						/>
					</div>

					<div style={{ marginBottom: '10px' }}>
						<input
							type='checkbox'
							onClick={() => setShowPassword(!showPassword)}
							style={{ marginRight: '8px', marginBottom: '10px' }}
						/>
						<span>Show password</span>
					</div>

					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
