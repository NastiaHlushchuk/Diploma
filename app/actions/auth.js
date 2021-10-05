import {
	AUTH_LOGGED_IN,
	AUTH_LOGOUT,
	AUTH_ERROR_MESSAGE,
	AUTH_CLEAR_ERROR_MESSAGE,
	AUTH_SET_PROFILE,
} from '../constants/auth';
import { authService } from '../service/authService';
// import { usersService } from '../service/usersService';
import AsyncStorage from '@react-native-community/async-storage';
import navigationService from '../service/navigationService';
import { authStorage } from '../helpers/checkAsyncStorage';

const loggedIn = data => ({
	type: AUTH_LOGGED_IN,
	payload: data,
});
const loggedOut = () => ({
	type: AUTH_LOGOUT,
});
const setErrorMessages = data => ({
	type: AUTH_ERROR_MESSAGE,
	payload: data,
});
const setProfile = data => ({
	type: AUTH_SET_PROFILE,
	payload: data
});
export const clearErrorMessages = () => ({
	type: AUTH_CLEAR_ERROR_MESSAGE,
});
/**
 * Logout from the app.
 */
export const logout = () => async (dispatch) => {
	dispatch(clearErrorMessages());
	await authService.signOut().then((res) => {
		dispatch(loggedOut());
	}).catch((err) => {

	});
	await AsyncStorage.removeItem("token")
	await AsyncStorage.removeItem("user_id")
	await AsyncStorage.removeItem("loggedIn");
	await AsyncStorage.removeItem("state");
	navigationService.navigate("Auth");

}
/**
 * Login user in the app.
 * @param {*} email  email for sign in.
 * @param {*} password password for sign in.
 */
export const login = (email, password) => async (dispatch) => {
	dispatch(clearErrorMessages());
	let userToken = null;
	let userId = null;
	await authService.login(email, password).then((res) => {
		if (res.status == 200) {
			let result = JSON.parse(res.request._response);
			console.log('RESULT', result.token)
			userId = "" + result.user_id;
			userToken = result.token;
			dispatch(clearErrorMessages());
			dispatch(loggedIn(result));
		}
		else {
			dispatch(setErrorMessages({ errors: result.message }));
		}
	}).catch((err) => {

	});
	await AsyncStorage.removeItem("token")
	await AsyncStorage.setItem("loggedIn", "true");
	await AsyncStorage.setItem("user_id", userId);
	await AsyncStorage.setItem("token", userToken);
};
