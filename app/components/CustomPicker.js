import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';

class CustomPicker extends Component {
	render() {
		return (
			<View style={{ marginHorizontal: 10, marginBottom:20 }}>
				{this.props.label && <Text style={[this.props.labelStyle]}>{this.props.label}</Text>}
				<View style={[this.props.containerStyle]}>
					<Picker
						disabled={this.props.disabled}
						mode={this.props.mode}
						onValueChange={this.props.onChange}
						selectedValue={this.props.selectedValue}
						style={[this.props.style]}
					>
						{this.props.dataType == "object" ?
							Object.keys(this.props.data).map((el, i) =>
								<Picker.Item label={Object.values(this.props.data)[i]} value={el} key={"element" + '-' + i} />) :
							this.props && this.props.data ? this.props.data.map((element, index) =>
								<Picker.Item label={element.label} value={element.value} key={element.value + '-' + index}
								/>) : null
						}
					</Picker>
					{this.props.errorMessage && <Text style={this.props.errorStyle}>{this.props.errorMessage}</Text>}
				</View>
			</View>
		)
	}
}
CustomPicker.defaultProps = {
	labelStyle: { fontSize: 14, color: "#86939e", fontFamily: "sans-serif", fontWeight: "bold", padding: 0 },
	mode: "dialog",
	disabled: false,
	useDefault: false,
	errorStyle: { paddingHorizontal: 10, color: "red" },
	dataType: "array",
};
CustomPicker.propTypes = {
	containerStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	style: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	onChange: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	label: PropTypes.string,
	dataType: PropTypes.string,
	labelStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	disabled: PropTypes.bool,
	data: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	mode: PropTypes.string,
	errorStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
}
export default CustomPicker;