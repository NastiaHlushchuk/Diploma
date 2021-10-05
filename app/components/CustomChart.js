import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Text as NewText } from 'react-native-svg'
import { BarChart, Grid, YAxis, LineChart } from 'react-native-svg-charts'
class CustomChart extends Component {
	render() {
		const CUT_OFF = this.props.max ? this.props.max / 2 : 10;
		const Labels = ({ x, y, bandwidth, data }) => (
			data.map((value, index) => (
				<NewText
					key={index}
					x={parseInt(value) > CUT_OFF ? x(0) + 20 : x(value) + 10}
					y={y(index) + (bandwidth / 2)}
					fontSize={14}
					fill={parseInt(value) > CUT_OFF ? 'white' : 'black'}
					alignmentBaseline={'middle'}
				>
					{value}{this.props.max ? `/${this.props.max} ${this.props.symbol}` : ``}
				</NewText>
			))
		)
		return (
			<View style={[this.props.containerStyle, { paddingHorizontal: 10, justifyContent: "center" }]}>
				<View style={{ paddingHorizontal: 0, width: "100%" }}>
					{this.props.label && <Text style={[this.props.labelStyle]}>{this.props.label}</Text>}
					{this.props.data && this.props.data.length > 0 &&
						<View style={{ flexDirection: "column", alignItems: "center" }}>
							{this.props.type == "line" ?
								<View style={{ flexDirection: 'row', minHeight: 220, maxHeight: 250, padding: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#4E587B" }}>
									<YAxis
										data={this.props.yAxis ? this.props.yAxis : this.props.data}
										style={{ marginBottom: 0 }}
										contentInset={{ top: 5, bottom: 5 }}
										svg={{ fontSize: 10, fill: 'grey' }}
										formatLabel={(value, index) => this.props.symbol ? `${value} ${this.props.symbol}` : value}
										numberOfTicks={10}
									/>
									<View style={{ flex: 1, marginLeft: 10 }}>
										<LineChart
											style={{ flex: 1, paddingVertical: 0 }}
											data={this.props.data}
											svg={{ stroke: 'rgb(134, 65, 244)' }}
											contentInset={{ top: 5, bottom: 5 }}
											numberOfTicks={3}
											gridMin={0}
											gridMax={this.props.max}
										>
											<Grid />
										</LineChart>
									</View>
								</View>
								:
								this.props.type == "bar" ?
									<View style={{ flexDirection: 'row', height: 50, paddingVertical: 5, borderWidth: 1, borderStyle: "solid", borderColor: "#4E587B" }}>
										<BarChart
											style={{ flex: 1, paddingVertical: 0 }}
											data={this.props.data}
											yMax={this.props.max}
											horizontal={true}
											numberOfTicks={5}
											svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
											contentInset={{ top: 0, bottom: 0 }}
											gridMin={0}
											gridMax={this.props.max}
										>
											<Grid direction={Grid.Direction.VERTICAL} />
											<Labels />
										</BarChart>

									</View>
									: null}

						</View>
					}
				</View>
			</View>
		)
	}
}
CustomChart.defaultProps = {
	labelStyle: { fontSize: 14, color: "#86939e", fontFamily: "sans-serif", fontWeight: "bold", paddingVertical: 5 },
	containerStyle: { paddingVertical: 10, width: "100%" },
	type: "line",
	height: 200,
	horizontal: false,
};
CustomChart.propTypes = {
	containerStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	style: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	label: PropTypes.string,
	labelStyle: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
	data: PropTypes.oneOfType([
		PropTypes.array,
	]),
	type: PropTypes.string,
	height: PropTypes.number,
	max: PropTypes.number,
	horizontal: PropTypes.bool,
}
export default CustomChart;