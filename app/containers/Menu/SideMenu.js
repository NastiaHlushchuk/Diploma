import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import navigationService from '../../service/navigationService';
import { Dimensions, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { redesign } from '../../themes/redesign';
import { logout } from "../../actions/auth"
class SideMenu extends Component {
	navigateToScreen = (route) => () => {
		navigationService.navigate(route);
	}
	buttons = [
		{
			route: "Dashboard",
			title: "Панель управления",
			icon: "dashboard",
			allowed: [1, 2],
			always:true,
		},
		{
			route: "Categories",
			title: "Категории",
			icon: "barcode",
			allowed: [1, 2],
			always:true,
		},
		{
			route: "Products",
			title: "Товары",
			icon: "th-large",
			allowed: [1, 2],
			always:true,
		},
		{
			route: "Attributes",
			title: "Атрибуты",
			icon: "th",
			allowed: [1, 2],
			always:true,
		},
		{
			route: "Orders",
			title: "Заказы",
			icon: "cart-arrow-down",
			allowed: [1, 2],
			always:true,
		},
		{
			route: "Products",
			title: "Склад",
			icon: "suitcase",
			allowed: [1, 2],
			always:true,
		},
		{
			route: "",
			func: () => { this.props.goLogout() },
			title: "Выйти",
			icon: "power-off",
			allowed: [1, 2],
			always:true,
		},
	]
	inArray = (allowedArray, value) => {
		return (allowedArray.filter(function (item) { return item == value })).length > 0
	}
	render() {
		let screenwidth = Math.round(Dimensions.get('window').width);
		const { user_role, first_name, last_name } = this.props;
		return (
			<React.Fragment>
				<View style={redesign.LeftMenu.container}>
					<ScrollView style={{ marginBottom: 30 }}>
						{/* Close Button */}
						<View style={{ width: "100%" }}>
							<TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer() }} style={{ alignItems: "flex-end", paddingHorizontal: 20 }}>
								<Icon name="times" color="#FFC669" type="font-awesome" size={30} />
							</TouchableOpacity>
						</View>
						{/* User block */}
						<View>
							{
								first_name && last_name ?
									<View style={[redesign.LeftMenu.centered]}>
										<TouchableOpacity style={{width:"100%", alignItems:"center"}} onPress={() => { this.props.navigation.navigate('Profile', {}) }}>

											{/* ROUNDED */}
											<View style={redesign.LeftMenu.rounded}>
												<Text style={redesign.LeftMenu.roundedText}>
													{`${first_name ? first_name[0] : null}${last_name ? last_name[0] : null}`}
												</Text>
											</View>

											{/* NAME AND SURNAME */}
											<Text style={redesign.LeftMenu.initials}>
												{`${first_name ? first_name : ""} ${last_name ? last_name : ""}`}
											</Text>
										</TouchableOpacity>
									</View>
									:
									null
							}
						</View>
						{/* Buttons block */}
						<View style={{ width: "100%", alignItems: "center" }}>
							<View style={{ width: 260 }}>
								{this.buttons.map((button, key) => {
									return this.inArray(button.allowed, user_role) || button.always ?
										<View key={key} style={{
											borderBottomWidth: 1,
											borderBottomStyle: "solid",
											borderBottomColor: "#97A6BA"
										}}>
											<TouchableOpacity key={key}
												onPress={() => {
													this.props.navigation.toggleDrawer();
													button.func ? button.func() : this.props.navigation.navigate(button.route, {})
												}}
												style={{ paddingHorizontal: 0, paddingVertical: 12, flexDirection: "row" }}
											>
												<View style={{ width: 30, display: "flex", justifyContent: "flex-start", marginRight: 10 }}>
													<Icon type="font-awesome" color="#FFC669" name={button.icon} size={20} />
												</View>
												<Text style={redesign.LeftMenu.touchableText}>{button.title}</Text>
											</TouchableOpacity>
										</View>
										: null
								}
								)}

							</View>
						</View>
					</ScrollView>
				</View>
			</React.Fragment>
		);
	}
}
SideMenu.propTypes = {
	navigation: PropTypes.object
};
const mapStateToProps = (state) => {
	return {
		data: state.auth.data,
		user_role: state.auth.user_role,
		first_name: state.auth.user_first_name,
		last_name: state.auth.user_last_name,
	};
};
const mapDispatchToProps = dispatch => ({
	goLogout: async () => {
		await dispatch(logout());
	},
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenu);