import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import LoadingState from '../components/LoadingState';
import BackButton from '../components/BackButton';

const NewTicket = () => {
	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, message, isSuccess } = useSelector(
		(state) => state.tickets
	);

	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState('iPhone');
	const [description, setDescription] = useState();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const form = useRef();

	useEffect(() => {
		dispatch(reset());
		if (isError) {
			toast.error(message);
		}
		if (isSuccess) {
			dispatch(reset());
			toast.success('Ticket created');
			navigate('/tickets');
		}
	}, [isSuccess, isError, message, dispatch, navigate, reset]);

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_gsxcsde',
				'template_jd4gbnf',
				form.current,
				'8-62xwUrd_SYRQMd8'
			)
			.then(
				(result) => {
					console.log(result.text);
					dispatch(createTicket({ product, description }));
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	if (isLoading) {
		return <LoadingState />;
	}
	return (
		<>
			<BackButton url='/' />
			<section className='heading'>
				<h1>Create New Ticket</h1>
				<p>Please fill the form</p>
			</section>

			<section className='form'>
				<form ref={form} onSubmit={sendEmail}>
					<div className='form-group'>
						<label htmlFor='name'>Customer Name</label>
						<input
							name='name'
							type='text'
							className='form-control'
							value={name}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Customer Email</label>
						<input
							name='email'
							type='text'
							className='form-control'
							value={email}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='product'>Select a product</label>
						<select
							name='product'
							id='product'
							value={product}
							onChange={(e) => setProduct(e.target.value)}
						>
							<option value='iPhone'>iPhone</option>
							<option value='iPad'>iPad</option>
							<option value='Macbook Pro'>Macbook Pro</option>
							<option value='iMac'>iMac</option>
						</select>
					</div>

					<div className='form-group'>
						<label htmlFor='description'>
							Description of the issue
						</label>
						<textarea
							name='description'
							id='description'
							className='form-control'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default NewTicket;
