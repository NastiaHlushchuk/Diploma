import AsyncStorage from '@react-native-community/async-storage';

/**
 * Save user login data.
 * @param {*} email  email for sign in.
 * @param {*} password password for sign in.
 */
export const saveUserSignIn = async (email, password) => {
    let users = [];
    let userSignIn = {
        email,
        password
    }
    let position = null;
    if (email && email != "") {
        await AsyncStorage.setItem("users", JSON.stringify(userSignIn));
    }
};
/**
 * Return users list with credentials
 */
export const getUsers = async () => {
    let users = await AsyncStorage.getItem('users')
    if (users)
        return JSON.parse(users)
    return null
}