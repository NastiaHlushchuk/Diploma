import React from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadSingle } from "../../../actions/orders"
import { ScrollView } from 'react-native';
import { redesign } from '../../../themes/redesign';
import CustomHeader from "../../../components/CustomHeader"
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false,
    }
  }
  componentDidMount() {
    this.loadList();
  }
  loadList = async () => {
    this.setState({ dataLoading: true });
    await this.props.goLoadSingle(this.props.id);
    this.setState({ dataLoading: false });
  }
  render() {
    let { selected } = this.props
    console.log("Got order", this.props.id,selected)
    return (
      <React.Fragment>
        <View style={redesign.Containers.screenContainer}>
          {/* Header */}
          <CustomHeader
            title={`Заказ #${selected && selected.id}`}
            token={this.props.token}
            leftFunc={() => { this.props.navigation.toggleDrawer() }}
            rightIcon="edit"
            rightFunc={() => this.props.navigation.navigate('CategoryEdit', {})}
          />
          {/* Servers table */}
          <ScrollView style={{ padding: 10, marginBottom: 30 }} refreshControl={<RefreshControl refreshing={this.state.dataLoading} onRefresh={this.loadList} />}>
            <View style={{ padding: 10 }}>
            <View style={{ width: "100%", textAlign: "center" }}>
                        <Text style={{
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: 18,
                          color: "#4E587B",
                        }}>{`#${selected.id} ${selected.customer.first_name} ${selected.customer.last_name}`}</Text>
                        <Text style={{
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          fontStyle: 'normal',
                          fontWeight: '700',
                          lineHeight: 18,
                          color: "#4E587B",
                        }}>{`${selected.price} ${selected.status} ${selected.created_at}`}</Text>

                      </View>
            </View>
            {/* Описание */}
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Таблица товаров
                  </Text>
              </View>
              <View>
                <Text>{selected && selected.description}</Text>
                <View>
                  {selected && selected.products && selected.products.map((element,index)=>(
                    <View>
                    <Text>{element.product.name}</Text>
                    <Text>За единицу: {element.product.sell_price}</Text>
                    <Text>Количество: {element.count}</Text>
                    <Text>Итого: {element.count*element.product.sell_price}</Text>
                  </View>
                  ))}
                  
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    id: state.orders.id,
    selected: state.orders.selected,
    token: state.auth.token,
  };
};
const mapDispatchToProps = dispatch => ({
  goLoadSingle: async (id) => {
    await dispatch(loadSingle(id))
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
