import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker'

class CustomDatePicker extends Component {
	render() {
		return (
			<View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
				<Text style={this.props.labelStyle}>
					{this.props.label}
				</Text>
				<View style={this.props.containerStyle}>
					<DatePicker
						style={{ width: "100%", alignItems: "flex-start" }}
						mode="date"
						placeholder="Select date"
						format="MM/DD/YYYY"
						date={this.props.value}
						onDateChange={this.props.onChange}
						customStyles={{
							dateIcon: {
								display: "none"
							},
							dateInput: {
								width: "100%",
								borderWidth: 0,
								alignItems: "flex-start"
							},
							placeholderText: {
								color: "black",
								fontSize: 16,
							},
							dateText: {
								fontSize: 16,
							}
						}}
					/>
				</View>
			</View>
		)
	}
}
CustomDatePicker.defaultProps = {
};
CustomDatePicker.propTypes = {
	containerStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
	]),
	label: PropTypes.string,
}
export default CustomDatePicker;