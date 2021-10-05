import React from 'react';
import LoginForm from "../../containers/Auth/LoginForm";
import { redesign } from '../../themes/redesign';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import { Image } from 'react-native-elements';
export default class SignInScreen extends React.Component {
	render() {
		let screenHeight = Math.round(Dimensions.get('window').height);
		return (
			<React.Fragment>
				<View style={{ backgroundColor: "#fff" }}>
					{/* Login form */}
					<View style={{ height: screenHeight - 160, marginTop:160 }}>
						<LoginForm />
					</View>
				</View>
			</React.Fragment>
		)
	}
}