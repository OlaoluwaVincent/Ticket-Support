import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NewTicket from './NewTicket';
import PrivateRoute from '../components/PrivateRoute';
import Tickets from './Tickets';
import Ticket from './Ticket';
import AdminLock from '../components/AdminLock';
import AdminPage from './AdminPage';
import AdminTickets from './AdminTickets';
import AdminTicket from './AdminTicket';

const indexPage = () => {
	return (
		<div className='container'>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/register' element={<Register />} />
				<Route exact path='/new-ticket' element={<PrivateRoute />}>
					<Route exact path='/new-ticket' element={<NewTicket />} />
				</Route>
				<Route exact path='/admin' element={<AdminLock />}>
					<Route exact path='/admin' element={<AdminPage />} />
				</Route>
				<Route exact path='/admin/tickets' element={<AdminLock />}>
					<Route
						exact
						path='/admin/tickets'
						element={<AdminTickets />}
					/>
				</Route>
				<Route exact path='/tickets' element={<PrivateRoute />}>
					<Route exact path='/tickets' element={<Tickets />} />
				</Route>
				<Route
					exact
					path='/ticket/:ticketId'
					element={<PrivateRoute />}>
					<Route
						exact
						path='/ticket/:ticketId'
						element={<Ticket />}
					/>
				</Route>
				<Route
					exact
					path='/admin/ticket/:ticketId'
					element={<AdminLock />}>
					<Route
						exact
						path='/admin/ticket/:ticketId'
						element={<AdminTicket />}
					/>
				</Route>
			</Routes>
		</div>
	);
};

export default indexPage;
