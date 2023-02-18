import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import LoadingState from '../components/LoadingState';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

const Tickets = () => {
	const { tickets, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.tickets
	);
	const dispatch = useDispatch();
	// ↓ in my case items is an array, so I create a new array by spreading state here
	const items = [...tickets];
	// ↓ which means we're not manipulating state, but just our `items` array alone
	items.reverse();

	useEffect(() => {
		dispatch(getTickets());

		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, reset, isSuccess]);

	if (isLoading) {
		return <LoadingState />;
	}
	return (
		<>
			<BackButton url='/' />
			<h1>Tickets</h1>
			<div className='tickets'>
				<div className='ticket-headings'>
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{items.map((ticket) => (
					<TicketItem key={ticket._id} ticket={ticket} />
				))}
			</div>
		</>
	);
};

export default Tickets;
