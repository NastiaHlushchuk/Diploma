import {
	AUTH_LOGGED_IN,
	AUTH_LOGOUT,
	AUTH_ERROR_MESSAGE,
	AUTH_CLEAR_ERROR_MESSAGE,
	AUTH_SET_PROFILE,
} from '../constants/auth';

const INITIAL_STATE = {
	id: null,
	token: null,
	stages: [],
	user_first_name: "",
	user_last_name: "",
	user_role: null,
	data: null,
	errors: null,
	success:null,
};

export default authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AUTH_LOGOUT: {
			return {
				...INITIAL_STATE,
			};
		}
		case AUTH_CLEAR_ERROR_MESSAGE: {
			return {
				...state,
				errors: null,
				success:null,
			};
		}
		case AUTH_LOGGED_IN: {
			return {
				...state,
				id: action.payload.user_id,
				token: action.payload.token,
				user_role: action.payload.user_role,
				user_first_name: action.payload.user_first_name,
				user_last_name: action.payload.user_last_name,
				data: action.payload,
			}
		}
		case AUTH_ERROR_MESSAGE: {
			return {
				...state,
				...action.payload
			};
		}
		case AUTH_SET_PROFILE: {
			return {
				...state,
				data: action.payload[3],
				stages: action.payload[1].stages,
			}
		}
		default: {
			return state;
		}
	}
}
