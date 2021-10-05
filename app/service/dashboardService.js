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
			.get(`${API_URL}dashboard`, config)
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				console.log(err.response)
				reject(err.response)
			});
	});
}
export const dashboardService = {
	getList,
};
