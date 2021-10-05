import React, { Component } from 'react';
import { View, TextInput, Text, Style } from 'react-native';
import PropTypes from 'prop-types';

class CustomText extends Component {
	render() {
		return (
			<View style={[this.props.containerStyle, { paddingHorizontal: 0 }]}>
				<View style={this.props.hideBorder && { borderBottomWidth: 1, borderColor: "#86939e", paddingHorizontal: 0 }}>
					{this.props.label && <Text style={[this.props.labelStyle]}>{this.props.label}</Text>}
					<TextInput
						multiline={this.props.multiline}
						disabled={this.props.disabled}
						numberOfLines={this.props.numberOfLines}
						onChangeText={this.props.onChange}
						value={this.props.value}
						style={this.props.style}
					/>
				</View>
			</View>
		)
	}
}
CustomText.defaultProps = {
	labelStyle: { fontSize: 14, color: "#86939e", fontFamily: "sans-serif", fontWeight: "bold", padding: 0 },
	disabled: false,
	hideBorder: false,
};
CustomText.propTypes = {
	containerStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	style: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	onChange: PropTypes.func,
	value: PropTypes.string,
	label: PropTypes.string,
	labelStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	multiline: PropTypes.bool,
	hideBorder: PropTypes.bool,
	numberOfLines: PropTypes.number,
	disabled: PropTypes.bool,
}
export default CustomText;