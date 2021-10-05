import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Text } from 'react-native';
import { Button, Header, Icon, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import SuccessMessage from "./SuccessMessage"
import CustomPicker from './CustomPicker';
import DatePicker from 'react-native-datepicker'
class CustomHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {

			},
			simple_search_by: "any",
			simple_search_parameter: "",

			filter: false,
			search: false,
		}
	}
	componentDidMount() {
		let filters = [];
		if (this.props.filters) {
			this.props.filters.map((element) => {
				if (element.type == "date")
					filters[element.value_name] = ""//new Date();
				else
					filters[element.value_name] = "0";
			})
			this.setState({ data: { ...filters } })
		}
	}
	searchAndFilter = async () => {
		const { token } = this.props;
		const { data } = this.state;
		let result = {
			system_action: "refresh",
		}
		result[`${token}_simple_search_parameter[0]`] = this.state.simple_search_parameter
		result[`${token}_simple_search_by[0]`] = this.state.simple_search_by

		Object.keys(data).map((element, index) => {
			result[`${token}_${element}[0]`] = Object.values(data)[index];
		})

		this.props.callback(result);
	}
	changeFilterField = async (who, what) => {
		this.setState({ data: { [who]: what } }, () => this.searchAndFilter())
	}
	render() {
		return (
			<View>
				<Header
					leftComponent={{ icon: this.props.leftIcon, color: '#fff', onPress: () => { this.props.leftFunc() } }}
					centerComponent={{ text: this.props.title, style: { color: '#fff', fontFamily: "Roboto", fontSize: 24, fontStyle: "normal", fontWeight: "500", lineHeight: 24 } }}
					rightComponent={<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						{/* FILTER START */}
						{this.props.filters &&
							<TouchableOpacity
								style={{ marginHorizontal: 10 }}
								onPress={() => this.setState({ filter: !this.state.filter, search: false })}
							>
								<Icon
									name='filter'
									color={this.state.filter ? '#FFC669' : '#fff'}
									size={20}
									type="font-awesome-5"
								/>
							</TouchableOpacity>
						}
						{/* FILTER END */}

						{/* SEARCH START */}
						{this.props.searchBy &&
							<TouchableOpacity
								style={{ marginHorizontal: 10 }}
								onPress={() => this.setState({ search: !this.state.search, filter: false })}
							>
								<Icon
									name='search'
									color={this.state.search ? '#FFC669' : '#fff'}
									size={20}
									type="font-awesome-5"
								/>
							</TouchableOpacity>
						}
						{/* SEARCH END */}

						{/* RIGHT BUTTON START */}
						{this.props.spinner ?
							<ActivityIndicator color="#fff" size={20} style={{ marginHorizontal: 10 }} /> :
							this.props.rightFunc ?
								<TouchableOpacity
									style={{ marginHorizontal: 10 }}
									onPress={() => { this.props.rightFunc() }}>
									<Icon
										name={this.props.rightIcon}
										color='#fff'
										size={20}
										type="font-awesome-5"
									/>
								</TouchableOpacity> : null
						}
						{/* RIGHT BUTTON END */}
					</View>}
					containerStyle={{ paddingTop: 0, height: 56, backgroundColor: "#4E587B" }}
				/>
				{/* Success message */}
				<SuccessMessage successMessage={this.props.success} errorMessage={this.props.error} />
				{(this.state.search || this.state.filter) &&
					<View>
						{/* Search */}
						{this.state.search && this.props.searchBy &&
							<View style={styles.formStyle}>
								<Input
									value={this.state.simple_search_parameter}
									onChangeText={(value) => { this.setState({ simple_search_parameter: value }) }}
									placeholder="Type here"
									inputContainerStyle={styles.inputContainerStyle}
									inputStyle={styles.inputStyle}
								/>
								<CustomPicker
									style={styles.inputStyle}
									containerStyle={styles.inputContainerStyle}
									selectedValue={this.state.simple_search_by}
									onChange={(value, index) => { this.setState({ simple_search_by: value }) }}
									data={this.props.searchBy}
									mode="dropdown"
								/>
								{/* Search Button */}
								<View style={styles.centered}>
									<Button
										title={'Search'}
										buttonStyle={styles.buttonStyle}
										titleStyle={styles.titleStyle}
										onPress={this.searchAndFilter}
									/>
								</View>
							</View>
						}
						{/* Filter */}
						{this.state.filter && this.props.filters &&
							<View style={styles.formStyle}>
								<View style={{ justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
									{this.props.filters.map((element, index) =>
										<View key={`filter_${index}`} style={{ width: "100%", marginBottom: 10 }}>
											{/* PICKER FILTER */}
											{element.type == "picker" &&
												<CustomPicker
													// style={styles.pickerStyle}
													style={styles.inputStyle}
													containerStyle={styles.inputContainerStyle}
													labelStyle={styles.labelStyle}
													selectedValue={this.state.data[element.value_name]}
													onChange={(value, index) => { this.changeFilterField(element.value_name, value) }}
													data={element.data}
													label={element.label != '' ? element.label : null}
													mode="dropdown"
												/>
											}
											{/* DATE FILTER */}
											{element.type == "date" &&
												<View style={{ paddingHorizontal: 10 }}>
													<Text style={styles.labelStyle}>
														{element.label}
													</Text>
													<View style={styles.inputContainerStyle}>
														<DatePicker
															mode="date"
															style={{ width: "100%" }}
															placeholder="Select date"
															format="MM/DD/YYYY"
															iconComponent={<Icon name="calendar-alt" type="font-awesome-5" color="#A6B1D5" size={24} style={{paddingHorizontal:10}}/>}
															date={this.state.data[element.value_name]}
															onDateChange={(date) => { this.changeFilterField(element.value_name, date) }}
															customStyles={styles.datePickerStyle}
														/>
													</View>
												</View>
											}
										</View>
									)}

								</View>
							</View>
						}
					</View>}
			</View>
		)
	}
}
const styles = {
	centered: {
		width: "100%",
		alignItems: "center",
		marginTop: 10,
	},
	buttonStyle: {
		backgroundColor: "#5A648A",
		width: 100,
		height: 35,
		borderRadius: 5,
	},
	formStyle: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderBottomWidth: 3,
		borderBottomColor: "lightgray",
		backgroundColor: "#fff"
	},
	inputContainerStyle: {
		borderBottomColor: "#8D9AC8",
		borderStyle: "solid",
		borderBottomWidth: 1,
		padding: 0,
		height: 38,
	},
	inputStyle: {
		fontFamily: "Roboto",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: 12,
		padding: 0,
		color: "#97A2C5",
	},
	labelStyle: {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 14,
		lineHeight: 14,
		color: "#4E587B",
	},
	pickerStyle: {
		// height: 25,
		fontSize: 14,
		borderBottomWidth: 1,
		paddingHorizontal: 0
	},
	titleStyle: {
		fontFamily: "Inter",
		fontStyle: "normal",
		fontWeight: "500",
		fontSize: 18,
		lineHeight: 18,
		color: "#FFC669",
	},
	datePickerStyle: {
		dateIcon: {
			// display: "none"
		},
		dateInput: {
			width: "100%",
			borderWidth: 0,
			// borderBottomWidth: 1,
			// borderBottomColor: "#8D9AC8",
			alignItems: "flex-start",
			paddingVertical: 0,
			margin: 0,
			// height: 25,
		},
		placeholderText: {
			fontFamily: "Roboto",
			fontSize: 14,
			fontStyle: "normal",
			fontWeight: "400",
			lineHeight: 14,
			color: "#000",
		},
		dateText: {
			fontFamily: "Roboto",
			fontSize: 14,
			fontStyle: "normal",
			fontWeight: "400",
			lineHeight: 14,
		},
	}
};
CustomHeader.defaultProps = {
	containerStyle: { paddingTop: 0, height:38, backgroundColor: "#4f748e", },
	leftIcon: "menu",
	rightIcon: "plus",
};
CustomHeader.propTypes = {
	containerStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	leftIcon: PropTypes.oneOf(["menu", "chevron-left"]),
	rightIcon: PropTypes.oneOf(["plus", "save"]),
	leftFunc: PropTypes.func,
	rightFunc: PropTypes.func,
	token: PropTypes.string,
}
export default CustomHeader;