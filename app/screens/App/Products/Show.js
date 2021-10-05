import React from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadSingle } from "../../../actions/products"
import { ScrollView } from 'react-native';
import { redesign } from '../../../themes/redesign';
import CustomHeader from "../../../components/CustomHeader"
class Category extends React.Component {
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
    console.log("Selected", this.props.id, selected)
    return (
      <React.Fragment>
        <View style={redesign.Containers.screenContainer}>
          {/* Header */}
          <CustomHeader
            title={selected && selected.name}
            token={this.props.token}
            leftFunc={() => { this.props.navigation.toggleDrawer() }}
            rightIcon="edit"
            rightFunc={() => this.props.navigation.navigate('ProductEdit', {})}
          />
          {/* Servers table */}
          <ScrollView style={{ padding: 10, marginBottom: 30 }} refreshControl={<RefreshControl refreshing={this.state.dataLoading} onRefresh={this.loadList} />}>
            <View style={{ padding: 10 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: selected && selected.image }}
                  style={{ width: 250, height: 250 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </View>
            {/* Описание */}
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Описание
                  </Text>
              </View>
              <View>
                <Text>{selected && selected.description}</Text>
              </View>
            </View>
            {/* Ссылка */}
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Характеристики
                </Text>
              </View>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Код товара: </Text>
                  <Text>{selected && selected.code}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text>Количество: </Text>
                  <Text>{selected && selected.count}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Цена закупки: </Text>
                  <Text>{selected && selected.buy_price}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Цена продажи: </Text>
                  <Text>{selected && selected.sell_price}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text>Категория: </Text>
                  <Text>{selected && selected.category && selected.category.name}</Text>
                </View>
              </View>
            </View>
            {/* Атрибуты */}
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Атрибуты категории
                </Text>
              </View>
              <View>
                {selected && selected.attributes && selected.attributes.map((element, id) => (
                  <Text style={{ paddingHorizontal: 10 }} key={`attr_${id}`}> {element.attribute.name} - {element.value}</Text>
                ))}
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
    id: state.products.id,
    selected: state.products.selected,
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
)(Category);
