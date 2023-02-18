import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaStickyNote } from 'react-icons/fa';

const AdminPage = () => {
	return (
		<>
			<section className='heading'>
				<h1>
					<FaLock /> Administrative Access
				</h1>
				<p>Click to view or Tickets or Notes</p>
			</section>
			<Link to={'./tickets'} className='btn btn-primary'>
				<FaStickyNote /> View User Tickets
			</Link>
		</>
	);
};

export default AdminPage;
