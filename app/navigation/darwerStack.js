import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import DashboardScreen from '../screens/App/Dashboard/List';

import CategoriesScreen from '../screens/App/Categories/List';
import CategoryScreen from '../screens/App/Categories/Show';
import CategoryCreateScreen from '../screens/App/Categories/Create';
import CategoryEditScreen from '../screens/App/Categories/Edit';

import ProductsScreen from '../screens/App/Products/List';
import ProductScreen from '../screens/App/Products/Show';
import ProductCreateScreen from '../screens/App/Products/Create';
import ProductEditScreen from '../screens/App/Products/Edit';

import OrdersShaoScreen from '../screens/App/Orders/List';
import OrderShaoScreen from '../screens/App/Orders/Show';

import AttributesScreen from '../screens/App/Attributes/List';

const headerLeftFunction = (navigation) => {
	return <TouchableOpacity onPress={navigation.toggleDrawer}>
		<Icon name="bars" size={30} />
	</TouchableOpacity>
}

const stackNav = createStackNavigator({
	Dashboard: {
		screen: DashboardScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},

	Categories: {
		screen: CategoriesScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	Category: {
		screen: CategoryScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	CategoryCreate: {
		screen: CategoryCreateScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	CategoryEdit: {
		screen: CategoryEditScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},

	Products: {
		screen: ProductsScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	Product: {
		screen: ProductScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	ProductCreate: {
		screen: ProductCreateScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	ProductEdit: {
		screen: ProductEditScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},

	Orders: {
		screen: OrdersShaoScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},
	Order: {
		screen: OrderShaoScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},

	Attributes: {
		screen: AttributesScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => headerLeftFunction(navigation),
		})
	},

}, {
	headerMode: 'none',
	initialRouteName: 'Dashboard',
});

export default stackNav;
