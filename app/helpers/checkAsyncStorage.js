import AsyncStorage from '@react-native-community/async-storage';

export const authStorage = async () => {
	const token = await AsyncStorage.getItem('token');
	const user_id = await AsyncStorage.getItem('user_id');
	const loggedIn = await AsyncStorage.getItem('loggedIn');
	const state = await AsyncStorage.getItem('state');
	return {
		loggedIn,
		user_id,
		token,
		state,
	};
};