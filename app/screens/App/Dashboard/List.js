import React from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { redesign } from '../../../themes/redesign';
import { loadList } from "../../../actions/dashboard";
import CustomHeader from "../../../components/CustomHeader"

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
		this.loadList();
	}
	loadList = async () => {
		this.setState({ dataLoading: true });
		await this.props.goLoadList([]);
		this.setState({ dataLoading: false });
	}
	render() {
		let { data } = this.props;
		return (
			<React.Fragment>
				<View style={redesign.Containers.screenContainer}>
					{/* Header */}
					<CustomHeader
						title="Dashboard"
						token={this.props.token}
						leftFunc={() => { this.props.navigation.toggleDrawer() }}
					/>
					<View>
						<ScrollView>
							<View>
								<Text style={{ textAlign: "center", padding: 10, fontSize: 16, fontWeight: "bold" }}>
									Топ 5 товаров за 30 дней
									</Text>
								<View>
									{data && data.products && data.products.map((element, index) => (
										<ListItem key={`product_${index}`}>
											<ListItem.Content>
												<View style={{ flexDirection: "row" }}>
													<View style={{ width: "80%" }}>
														<Text>
															{element.product.name}
														</Text>
													</View>
													<View style={{ width: "20%" }}>
														<Text>
															{parseInt(element.prod_sum)}
														</Text>
													</View>
												</View>
											</ListItem.Content>
										</ListItem>
									))}
								</View>
							</View>
							<View>
								<Text style={{ textAlign: "center", padding: 10, fontSize: 16, fontWeight: "bold" }}>
									Запасы товаров заканчиваются
								</Text>
								<View>
									{data && data.need && data.need.map((element, index) => (
										<ListItem key={`product_${index}`}>
											<ListItem.Content>
												<View style={{ flexDirection: "row" }}>
													<View style={{ width: "80%" }}>
														<Text>
															{element.name}
														</Text>
													</View>
													<View style={{ width: "20%" }}>
														<Text>
															{element.count}
														</Text>
													</View>
												</View>
											</ListItem.Content>
										</ListItem>
									))}
								</View>
							</View>
						</ScrollView>
					</View>
				</View>
			</React.Fragment>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		data: state.dashboard.data,
		token: state.auth.token,
	};
};
const mapDispatchToProps = dispatch => ({
	goLoadList: async () => {
		await dispatch(loadList())
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(List);
