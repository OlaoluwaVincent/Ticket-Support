import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

const BackButton = ({ url }) => {
	return (
		<Link to={url} className='btn btn-reverse btn-block'>
			<FaArrowCircleLeft />
		</Link>
	);
};

export default BackButton;
