import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import stackNav from './darwerStack';

import SignInScreen from '../screens/Auth/SignInScreen';
// import ForgotScreen from '../screens/Auth/ForgotScreen';
// import RegisterScreen from '../screens/Auth/RegisterScreen';

import SideMenu from '../containers/Menu/SideMenu';

const AppStack = createDrawerNavigator({
	HomeStack: {
		screen: stackNav,
	}
},
	{
		contentComponent: SideMenu,
		drawerWidth: "100%",
		drawerType: "back",
		swipeEnabled: true,
		minSwipeDistance: Dimensions.get('window').width * 0.15,
		initialRouteName: 'HomeStack',
	}
)

const AuthStack = createStackNavigator({
	SignIn: { screen: SignInScreen },
}, {
	headerMode: 'none',
	initialRouteName: 'SignIn'
});

const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			App: AppStack,
			Auth: AuthStack,
		},
		{
			initialRouteName: 'AuthLoading',
		},
	),
);

export default AppContainer;
