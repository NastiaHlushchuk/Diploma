import {
	APP_DASHBOARD_DATA,
} from '../constants/app';

const INITIAL_STATE = {
	data: null,
};

export default dashboardReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case APP_DASHBOARD_DATA: {
			return {
				...state,
				...action.payload
			}
		}
		default: {
			return state;
		}
	}
}
