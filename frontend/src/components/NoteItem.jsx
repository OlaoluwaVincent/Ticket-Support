import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
	console.log(note);
	return (
		<div
			className='note'
			style={{
				backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
				textColor: note.isStaff ? '#fff' : '#000',
			}}
		>
			<h4>
				Note from <span>{note.isStaff ? 'Admin' : note.user.name}</span>
			</h4>
			<p>{note.text ? note.text : note.staffResponse}</p>
			<div className='note-date'></div>
			{new Date(note.createdAt).toLocaleString('en-us')}
		</div>
	);
};

export default NoteItem;
