import axios from 'axios';

let URL;
if (process.env.NODE_ENV === 'development') {
	URL = 'http://localhost:5000/api/users/';
} else {
	URL = 'api/users/';
}

// const Register_URL = '/api/users/register';
// const Login_URL = '/api/users/login';

// Register User
const register = async (userData) => {
	const response = await axios.post(`${URL}/register`, userData);
	if (response.data) {
		sessionStorage.setItem('user', JSON.stringify(response.data));
	}
	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(`${URL}/login`, userData);
	if (response.data) {
		sessionStorage.setItem('user', JSON.stringify(response.data));
	}
	return response.data;
};

// Logout User
const logout = () => sessionStorage.removeItem('user');
//
const authService = {
	register,
	login,
	logout,
};
export default authService;
