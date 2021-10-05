import React from 'react';
import { connect } from 'react-redux';
import { redesign } from '../../themes/redesign';
import { login } from "../../actions/auth"
import { View, ActivityIndicator } from 'react-native';
import { Input, Button, Icon, Text } from "react-native-elements";
import navigationService from '../../service/navigationService';
// import CustomCheck from "../../components/CustomCheck";
import { getUsers, saveUserSignIn } from "../../helpers/functions"

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			hiddenPassword: true,
			showIndicator: false,
			savePassword: true,
		}
	}
	signIn = async () => {
		const { email, password } = this.state;
		try {
			this.toggleSpinner(true);
			await this.props.goLogin(email, password);
			this.toggleSpinner(false);
			if (!this.props.errors) {
				if (!!this.state.savePassword)
					await saveUserSignIn(email, password)
				this.navigateTo("App")
			}
		} catch (err) {
			console.log("got error", err)
			this.toggleSpinner(false);
		}
	}
	navigateTo = (where) => {
		navigationService.navigate(where);
	}
	toggleSpinner = (value) => {
		this.setState({ showIndicator: value })
	}
	getSignIn = async () => {
		let user = await getUsers();
		console.log("Got user data", user)
		if (user) {
			this.setState({ email: user.email, password: user.password, showMenu: false })
		}
	}
	componentDidMount() {
		this.getSignIn()
	}
	render() {
		return (
			<React.Fragment>
				<View style={{ display: 'flex', height: "100%" }}>
					{/* Title & fields */}
					<View style={{ flex: 3 }}>
						<Text h3 h3Style={redesign.Titles.auth}>
							Sign In
          	</Text>
						<View style={{ paddingHorizontal: 15 }}>
							{/* Email field */}
							<Input
								keyboardType="email-address"
								labelStyle={redesign.Fields.label}
								label="Email"
								value={this.state.email}
								onChangeText={(val) => { this.setState({ email: val }) }}
								inputContainerStyle={redesign.Fields.container}
								inputStyle={redesign.Fields.input}
								errorMessage={this.props.errors && this.props.errors.email}
								errorStyle={redesign.Fields.error}
							/>
							{/* Password field */}
							<Input
								keyboardType="default"
								labelStyle={redesign.Fields.label}
								label="Password"
								value={this.state.password}
								onChangeText={(val) => { this.setState({ password: val }) }}
								inputContainerStyle={redesign.Fields.container}
								inputStyle={redesign.Fields.input}
								errorMessage={this.props.errors && this.props.errors.password}
								errorStyle={redesign.Fields.error}

								secureTextEntry={this.state.hiddenPassword}
								rightIcon={{
									type: "font-awesome",
									name: this.state.hiddenPassword ? 'eye-slash' : 'eye',
									size: 18,
									style: redesign.Fields.iconEye,
									onPress: () => this.setState({ hiddenPassword: !this.state.hiddenPassword })
								}}
							/>
							{/* Save password field */}
							{/* <CustomCheck
								title='Save password'
								background="#fff"
								textStyle={redesign.CheckBox.text}
								checked={!!this.state.savePassword}
								onPress={() => this.setState({ savePassword: !this.state.savePassword })}
							/> */}
						</View>
					</View>
					{/* Buttons */}
					<View style={{ flex: 2 }}>
						<View style={{ height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 25 }}>
							{/* Sign in */}
							<Button
								title="Sign In"
								buttonStyle={redesign.Buttons.button}
								titleStyle={redesign.Buttons.title}
								iconRight={true}
								icon={this.state.showIndicator ? <ActivityIndicator color="#FFC669" /> : <Icon
									type="font-awesome"
									name="sign-in"
									size={18}
									color="#FFC669"
									style={redesign.Buttons.icon}
								/>}
								onPress={() => { this.signIn() }}
							/>
						</View>
					</View>
				</View>
			</React.Fragment >
		)
	}
}
const mapStateToProps = (state) => {
	return {
		errors: state.auth.errors,
	};
};
const mapDispatchToProps = dispatch => ({
	goLogin: async (email, password) => {
		await dispatch(login(email, password));
	},
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
