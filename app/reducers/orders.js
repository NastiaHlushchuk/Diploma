import {
	APP_ORDERS_DATA,
} from '../constants/app';

const INITIAL_STATE = {
	id: null,
	data: null,
	message: null,
	success: true,
	selected: null,
};

export default ordersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case APP_ORDERS_DATA: {
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
