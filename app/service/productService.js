import axios from 'axios';
import { API_URL } from '../config';
var qs = require('query-string')

function getList(token) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}products`, config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				console.log(err.response)
				reject(err.response)
			});
	});
}
function getSingle(token, id) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}products/${id}`, config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				console.log(err.response)
				reject(err.response)
			});
	});
}
function getCreate(token) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}
	
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}products/create`, config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				// console.log(err.response)
				reject(err.response)
			});
	});
}
function getEdit(token,id) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}
	
	return new Promise((resolve, reject) => {
		axios
			.get(`${API_URL}products/${id}/edit`, config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				// console.log(err.response)
				reject(err.response)
			});
	});
}
function removeItem(token, id, data) {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
	}
	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}products/${id}`, data, config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				console.log(err.response)
				reject(err.response)
			});
	});
}
export const productService = {
	getList,
	getCreate,
	getEdit,
	getSingle,
	removeItem
};
