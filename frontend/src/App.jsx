import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import IndexPage from './pages/IndexPage';
function App() {
	const { user } = useSelector((state) => state.auth);
	return (
		<>
			<BrowserRouter>
				<Header />
				<div className='userHolder'>
					{user ? (
						<h3>Hi, {user.name} </h3>
					) : (
						<h3>Please Log in to access Tickets</h3>
					)}
				</div>
				<IndexPage />
			</BrowserRouter>
			<ToastContainer />
		</>
	);
}

export default App;
