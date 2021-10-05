import React from 'react';
import { ActivityIndicator, Dimensions, RefreshControl, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Button, Icon, ListItem, Image, Overlay, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadList, setID, removeCategory } from "../../../actions/orders"
import { ScrollView } from 'react-native';
import { redesign } from '../../../themes/redesign';
import CustomHeader from "../../../components/CustomHeader"
class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addOverlay: false,
      deleteOverlay: false,
      showMenu: false,
      dataLoading: false,
      selected: null,
      selectedName: null,
      name: '',
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
  selectItem = (category, name) => {
    this.setState({ selected: category, selectedName: name, showMenu: true })
  }
  addItem = async () => {
    this.setState({ showMenu: false });
    await this.props.goSetID(this.state.selected);
    this.props.navigation.navigate('CategoryCreate', {})
  }
  removeCategory = async () => {
    this.setState({ showMenu: false, dataLoading: true });
    let data = {
      _method: "delete",
    }
    this.clearServer();
    await this.props.goRemoveCategory(this.state.selected, data);
    this.loadList();
    this.setState({ deleteOverlay: false, dataLoading: false });
  }
  clearServer = async () => {
    this.setState({
      name: '',
      addOverlay: false
    })
  }
  goToDetails = async () => {
    this.setState({ showMenu: false });
    await this.props.goSetID(this.state.selected);
    this.props.navigation.navigate('Order', {})
  }
  list = [
    {
      title: 'Details',
      icon: 'info',
      onPress: this.goToDetails,
    },
    {
      title: 'Remove',
      icon: 'trash-alt',
      onPress: () => this.setState({ showMenu: false, deleteOverlay: true }),
    },
    {
      title: 'Cancel',
      icon: 'times',
      onPress: () => this.setState({ showMenu: false }),
    },
  ];
  render() {
    console.log("Orders", this.props.orders)
    let screenwidth = Math.round(Dimensions.get('window').width);
    let MenuContainer = screenwidth <= 360 ? redesign.Containers.bottomSheet360 : redesign.Containers.bottomSheet
    let MenuItem = screenwidth <= 360 ? redesign.Containers.bottomSheetItem360 : redesign.Containers.bottomSheetItem
    return (
      <React.Fragment>
        <View style={redesign.Containers.screenContainer}>
          {/* Header */}
          <CustomHeader
            title="Заказы"
            token={this.props.token}
            leftFunc={() => { this.props.navigation.toggleDrawer() }}
            rightIcon="plus"
            rightFunc={() => { this.addItem() }}
          // rightFunc={() => { this.setState({ addOverlay: true }) }}
          />
          {/* Servers table */}
          <ScrollView style={{ padding: 10, marginBottom: 30 }} refreshControl={<RefreshControl refreshing={this.state.dataLoading} onRefresh={this.loadList} />}>
            {this.props && this.props.orders && this.props.orders.orders && this.props.orders.orders.map((element, index) => (
              <ListItem key={`category_${index}`} containerStyle={{
                borderBottomWidth: 1,
                borderStyle: "solid",
                borderColor: "#8D9AC8",
                backgroundColor: "transparent",
              }} bottomDivider>
                <ListItem.Content>
                  <TouchableOpacity onPress={() => this.selectItem(element.id, element.name)} style={{ width: "100%" }}>
                    <View style={{ width: "100%" }}>
                      <View style={{ width: "100%", textAlign: "center" }}>
                        <Text style={{
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: 18,
                          color: "#4E587B",
                        }}>{`#${element.id} ${element.customer.first_name} ${element.customer.last_name}`}</Text>
                        <Text style={{
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: 18,
                          color: "#4E587B",
                        }}>{`${element.price} ${element.status} ${element.created_at}`}</Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </View>
        {/* Bottom menu */}
        <BottomSheet isVisible={this.state.showMenu}>
          <View style={MenuContainer}>
            {this.list.map((l, i) => (
              <TouchableOpacity onPress={l.onPress} key={i} style={MenuItem}>
                <View style={{ height: 30 }}>
                  <Icon name={l.icon} iconStyle={{ padding: 5 }} type='font-awesome-5' color="#fff" size={18} />
                </View>
                <View style={{ height: 30 }}>
                  <Text style={{
                    textAlign: "center",
                    fontFamily: "Roboto",
                    fontSize: 12,
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: 12,
                    color: "#fff",
                  }}
                  >{l.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>

        {/* Remove server overlay */}
        <Overlay
          isVisible={this.state.deleteOverlay}
          onBackdropPress={() => this.setState({ deleteOverlay: !this.state.deleteOverlay })}
          overlayStyle={{ width: 300 }}
        >
          <View>
            <View style={{ padding: 20 }}>
              <Text style={{
                fontFamily: "Inter",
                fontSize: 14,
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: 14,
                color: "#5A648A",
                textAlign: 'center',
              }}>Are you sure to delete this item?</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
              <Button
                title={'Delete'}
                onPress={this.removeCategory}
                disabled={this.state.dataLoading}
                buttonStyle={redesign.Buttons.overlayButton}
                titleStyle={redesign.Buttons.overlayButtonTitle}
              />
              <Button
                title={'Cancel'}
                onPress={() => this.setState({ deleteOverlay: false })}
                disabled={this.state.dataLoading}
                buttonStyle={redesign.Buttons.overlayButton}
                titleStyle={redesign.Buttons.overlayButtonTitle}
              />
            </View>
          </View>
        </Overlay>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.data,
    selected: state.orders.id,
    token: state.auth.token,
  };
};
const mapDispatchToProps = dispatch => ({
  goLoadList: async () => {
    await dispatch(loadList())
  },
  goSetID: async (userData) => {
    await dispatch(setID(userData))
  },
  goRemoveCategory: async (id, data) => {
    await dispatch(removeCategory(id, data))
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList);
