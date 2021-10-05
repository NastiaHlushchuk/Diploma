import axios from 'axios';
import { API_URL } from '../config';

const qs = require('query-string')

// forgot_password/ajax/forgotPasswordAjax
function forgotPassword(email) {
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}forgot_password/ajax/forgotPasswordAjax`, {
				'api': 1,
				'email': email,
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err.response)
			});
	});
}

function login(email, password) {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}login`, {
				'email': email,
				'password': password,
			},config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err.response)
			});
	});
}
function signUp(data) {
	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}sign_up/registration464/ajax/registrationusers464Ajax`, qs.stringify(data), config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err.response)
			});
	});
}
function signOut() {
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}sign_out`, {
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err.response)
			});
	});
}
export const authService = {
	login,
	signUp,
	signOut,
	forgotPassword,
};
