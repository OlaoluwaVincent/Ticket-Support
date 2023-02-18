import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
	const { user } = useSelector((state) => state.auth);
	return (
		<Link
			to={
				!user.isAdmin
					? `/ticket/${ticket._id}`
					: `/admin/ticket/${ticket._id}`
			}
		>
			<div className='ticket'>
				<div className='ticket-date'>
					{new Date(ticket.createdAt).toLocaleString('en-US')}
				</div>
				<div>{ticket.product}</div>
				<div className={`status status-${ticket.status}`}>
					{ticket.status}
				</div>
			</div>
		</Link>
	);
};

export default TicketItem;
