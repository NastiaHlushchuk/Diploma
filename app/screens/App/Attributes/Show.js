import React from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadSingle } from "../../../actions/categories"
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
    return (
      <React.Fragment>
        <View style={redesign.Containers.screenContainer}>
          {/* Header */}
          <CustomHeader
            title={selected && selected.name}
            token={this.props.token}
            leftFunc={() => { this.props.navigation.toggleDrawer() }}
            rightIcon="edit"
            rightFunc={() => this.props.navigation.navigate('CategoryEdit', {})}
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
                  URL
                  </Text>
              </View>
              <View>
                <Text>{selected && selected.slug}</Text>
              </View>
            </View>
            {/* Количество продуктов */}
            <View style={{ padding: 10 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Количество продуктов в категории
                  </Text>
              </View>
              <View>
                <Text>{selected && selected.products && selected.products.length}</Text>
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
                  <Text style={{ paddingHorizontal: 10 }} key={`attr_${id}`}> - {element.name}</Text>
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
    id: state.categories.id,
    selected: state.categories.selected,
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
