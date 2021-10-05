import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import ScreenContainer from '../ScreenContainer';
import navigationService from '../service/navigationService';
import { authStorage } from '../helpers/checkAsyncStorage';
import { logout } from "../actions/auth"

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.bootstrapAsync();
	}

	bootstrapAsync = async () => {
		const userStorage = await authStorage();
		if (!this.props.token) {
			await this.props.goLogout();
		} else {
			navigationService.navigate(userStorage.loggedIn ? 'App' : 'Auth', {});
		}
	};

	render() {
		return (
			<ScreenContainer>
				<ActivityIndicator />
			</ScreenContainer>
		);
	}
}
function mapStateToProps(state) {
	return { token: state.auth.token };
}
const mapDispatchToProps = dispatch => ({
	goLogout: () => {
		dispatch(logout())
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthLoadingScreen);
