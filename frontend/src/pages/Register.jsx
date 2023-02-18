import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingState from '../components/LoadingState';

// Connecting to the Store
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
//
const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	// Recieve and set the values from the form
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// Destructuring the data on #formData
	const { name, email, password, confirmPassword } = formData;

	// Init dispatch to make our Functions in the Slice available
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		if (isSuccess || user) {
			navigate('/');
		}
		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
		} else {
			const userData = {
				name,
				email,
				password,
			};
			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <LoadingState />;
	}
	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							onChange={handleChange}
							required
							placeholder='Enter your Name'
						/>
					</div>
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
					<div className='form-group'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='form-control'
							id='confirmPassword'
							name='confirmPassword'
							value={confirmPassword}
							onChange={handleChange}
							required
							placeholder='Confirm Password'
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

export default Register;
