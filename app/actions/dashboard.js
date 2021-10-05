import { APP_DASHBOARD_DATA } from '../constants/app';
import { dashboardService } from '../service/dashboardService';
import { authStorage } from '../helpers/checkAsyncStorage';

const setData = data => ({
	type: APP_DASHBOARD_DATA,
	payload:  data,
});
export const loadList = (userData) => async (dispatch) => {
	let userStorage = await authStorage(),
		token = userStorage.token;

	await dashboardService.getList(token).then((res) => {
		let result = JSON.parse(res.request._response);
		dispatch(setData(result))
		// dispatch(setServersInfo({ pagination: result.data[1].pagination, data: result.data[1].tables }))
		// if (result.data[1].error_message) {
		// 	dispatch(setServerDetails({ errors: result.data[1].error_message }))
		// }
		// if (result.data[1].success_message) {
		// 	dispatch(setServerDetails({ success: result.data[1].success_message }))
		// }
	}).catch((err) => {
	});
};
