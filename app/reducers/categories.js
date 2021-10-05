import {
	APP_CATEGORY_DATA,
} from '../constants/app';

const INITIAL_STATE = {
	id: null,
	data: null,
	message: null,
	success: true,
	selected: null,
};

export default categoriesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case APP_CATEGORY_DATA: {
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
