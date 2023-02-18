import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
	getUserTicketbyId,
	reset,
	closeTicket,
	getUserNotesById,
	createResponse,
} from '../features/admin/adminSlice';
import LoadingState from '../components/LoadingState';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';

const customStyles = {
	content: {
		width: innerWidth < 601 ? '90%' : '600px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		position: 'relative',
	},
};

Modal.setAppElement('#root');

const AdminTicket = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [noteText, setNoteText] = useState('');
	const { notes, ticket, isLoading, isError, isSuccess, message } =
		useSelector((state) => state.admin);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ticketId } = useParams();
	//
	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(getUserTicketbyId(ticketId));
		dispatch(getUserNotesById(ticketId));
	}, [isError, message, ticketId]);

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success('Ticket Closed');
		// dispatch(reset());
		navigate('/admin/tickets');
	};
	//

	const openModal = () => {
		setModalIsOpen(true);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const onNoteSubmit = (e) => {
		e.preventDefault();
		dispatch(createResponse({ noteText, ticketId }));
		closeModal();
	};

	if (isLoading) {
		return <LoadingState />;
	}
	if (isError) {
		return (
			<>
				<h1>Oops!</h1>
				<h3> Something went wrong...</h3>
				<BackButton url={'/admin/tickets'} />
			</>
		);
	}
	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url={'/admin/tickets'} />
				<h2>
					Ticket ID: {ticket._id}
					<span className={`status status-${ticket.status}`}>
						{ticket.status}
					</span>
				</h2>
				<h3>
					Date Submitted:{' '}
					{new Date(ticket.createdAt).toLocaleString('en-us')}
				</h3>
				<h3>Product: {ticket.product}</h3>
				<hr />
				<div className='ticket-desc'>
					<h3>
						Description of Issue:
						<p>{ticket.description}</p>
					</h3>
				</div>
				<h2>Notes</h2>
			</header>

			{ticket.status !== 'closed' && (
				<button className='btn btn-modal' onClick={openModal}>
					<FaPlus /> Add Response
				</button>
			)}

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel='Add Notes'
			>
				<h2>Add Note</h2>
				<button className='btn btn-close' onClick={closeModal}>
					X
				</button>
				<form onSubmit={onNoteSubmit}>
					<div className='form-group'>
						<textarea
							name='text'
							id='noteText'
							className='form-control'
							placeholder='Note Text'
							value={noteText}
							onChange={(e) => setNoteText(e.target.value)}
						></textarea>
					</div>
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</Modal>

			{notes.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}

			{ticket.status !== 'closed' ? (
				<button
					onClick={onTicketClose}
					className='btn btn-block btn-danger'
				>
					Close Ticket
				</button>
			) : null}
		</div>
	);
};

export default AdminTicket;
