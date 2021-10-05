import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Icon, Badge } from 'react-native-elements'
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CustomAccordeon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openned: false,
		}
	}
	render() {
		return (
			<View style={{padding:10}}>
				<View>
					<TouchableOpacity style={{borderBottomWidth:1}} onPress={() => this.setState({ openned: !this.state.openned })}>
						<View style={styles.row}>
							<View style={styles.side}>
								
							</View>
							<View style={styles.center}>
								<Text style={[styles.title, styles.centered]}>
									{this.props.title}
								</Text>
							</View>
							<View style={styles.side}>
								<Icon
									type="font-awesome"
									name={this.state.openned ? "chevron-down" : "chevron-right"}
                  size={14}
								/>
							</View>
						</View>
					</TouchableOpacity>
				</View>
				{this.state.openned ?
					<View style={{paddingVertical:10}}>
						{this.props.children}
					</View>
					: null}
			</View>
		)
	}
}
const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		height: 30,
		// borderWidth: 0.5,
	},
	title: {
		fontSize: 20,
	},
	badge: {
		fontSize: 14,
	},
	centered: {
		textAlign: "center"
	},
	side: {
		width: "10%"
	},
	center: {
		width: "80%",
	}
})
CustomAccordeon.defaultProps = {

};
CustomAccordeon.propTypes = {
	title: PropTypes.string,
}
export default CustomAccordeon;