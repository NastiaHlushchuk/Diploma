import React from 'react';
import { RefreshControl, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadCreate } from "../../../actions/products"
import { ScrollView } from 'react-native';
import { redesign } from '../../../themes/redesign';
import CustomCheck from "../../../components/CustomCheck"
import CustomHeader from "../../../components/CustomHeader"
import CustomText from "../../../components/CustomText"
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dataLoading: false,
      count: 0,
      code: "",
      buy_price: "",
      sell_price: "",
      category_id: null,
    }
  }
  componentDidMount() {
    this.loadList();
  }
  loadList = async () => {
    this.setState({ dataLoading: true });
    await this.props.goLoadCreate();
    this.setState({ dataLoading: false });
  }
  render() {
    let { selected } = this.props;
    return (
      <React.Fragment>
        <View style={redesign.Containers.screenContainer}>
          {/* Header */}
          <CustomHeader
            title="Создание товара"
            token={this.props.token}
            leftFunc={() => { this.props.navigation.toggleDrawer() }}
            rightIcon="save"
            rightFunc={() => console.log("Save")}
          />
          {/* Servers table */}
          <ScrollView style={{ padding: 10, marginBottom: 30 }} refreshControl={<RefreshControl refreshing={this.state.dataLoading} onRefresh={this.loadList} />}>
            {/* Ссылка */}
            <View style={{ padding: 10 }}>
              <Input
                label="Название"
                value={String(this.state.name)}
                onChangeText={(val) => this.setState({ name: val })}
                labelStyle={redesign.Fields.label}
                inputContainerStyle={redesign.Fields.container}
                inputStyle={redesign.Fields.input}
                disabled={this.state.showSpinner}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Input
                label="Код товара"
                value={String(this.state.code)}
                onChangeText={(val) => this.setState({ code: val })}
                labelStyle={redesign.Fields.label}
                inputContainerStyle={redesign.Fields.container}
                inputStyle={redesign.Fields.input}
                disabled={this.state.showSpinner}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Input
                label="Количество"
                value={String(this.state.count)}
                onChangeText={(val) => this.setState({ count: val })}
                labelStyle={redesign.Fields.label}
                inputContainerStyle={redesign.Fields.container}
                inputStyle={redesign.Fields.input}
                disabled={this.state.showSpinner}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Input
                label="Цена закупки"
                value={String(this.state.buy_price)}
                onChangeText={(val) => this.setState({ buy_price: val })}
                labelStyle={redesign.Fields.label}
                inputContainerStyle={redesign.Fields.container}
                inputStyle={redesign.Fields.input}
                disabled={this.state.showSpinner}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Input
                label="Цена продажи"
                value={String(this.state.sell_price)}
                onChangeText={(val) => this.setState({ sell_price: val })}
                labelStyle={redesign.Fields.label}
                inputContainerStyle={redesign.Fields.container}
                inputStyle={redesign.Fields.input}
                disabled={this.state.showSpinner}
              />
            </View>
            {/* Описание */}
            <View style={{ padding: 10 }}>
              <View style={{ backgroundColor: "transparent", marginTop: 20, borderBottomWidth: 1, borderStyle: "solid", borderColor: "#8D9AC8", paddingBottom: 20 }}>
                <Text h4Style={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: 18,
                  lineHeight: 18,
                  color: "#4E587B"
                }} h4>Описание</Text>
                <CustomText
                  value={this.state.description}
                  style={[{ textAlignVertical: "top", backgroundColor: "#fff", padding: 5, borderWidth: 1, borderColor: "#C9D1EA" }]}
                  onChange={(val) => this.setState({ description: val })}
                  multiline={true}
                  numberOfLines={5}
                  disabled={this.state.dataLoading}
                  containerStyle={{ marginVertical: 10 }}
                />
              </View>

            </View>

            <View style={{ alignItems: "center" }}>
              <Button title="Загрузить изображение" />
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
  goLoadCreate: async () => {
    await dispatch(loadCreate())
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
