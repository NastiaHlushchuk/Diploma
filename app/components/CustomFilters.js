import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import CustomPicker from './CustomPicker';
import { connect } from 'react-redux';
import { theme } from '../theme';
import { ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'

class CustomFilters extends React.Component {
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
        let haveFilters = !!this.props.filters;
        return (
            <React.Fragment>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: haveFilters ? "space-between" : "flex-end" }}>
                        {haveFilters &&
                            <View>
                                <Button type="clear" icon={{ name: "filter", type: "font-awesome", color: "white" }} onPress={() => this.setState({ filter: !this.state.filter, search: false })} />
                            </View>
                        }
                        <View>
                            <Button type="clear" icon={{ name: "search", type: "font-awesome", color: "white" }} onPress={() => this.setState({ search: !this.state.search, filter: false })} />
                        </View>
                    </View>
                    {(this.state.search || this.state.filter) &&
                        <View style={{ backgroundColor: "#a8bece", padding: 10, margin: 10 }}>
                            <View style={{ backgroundColor: "#e9eff3", padding: 5 }}>
                                {this.state.search && this.props.searchBy &&
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                                            <View style={{ minWidth: "45%" }}>
                                                <View style={theme.views.inputField}>
                                                    <Input
                                                        value={this.state.simple_search_parameter}
                                                        onChangeText={(value) => { this.setState({ simple_search_parameter: value }) }}
                                                        placeholder="Type here"
                                                        inputStyle={{ fontSize: 15 }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ minWidth: "40%" }}>
                                                <View style={theme.views.inputField}>
                                                    <CustomPicker
                                                        selectedValue={this.state.simple_search_by}
                                                        onChange={(value, index) => { this.setState({ simple_search_by: value }) }}
                                                        data={this.props.searchBy}
                                                        mode="dropdown"
                                                    />
                                                </View>
                                            </View>
                                            <View style={{ minHeight: "5%" }}>
                                                <Button
                                                    type="clear"
                                                    icon={{ name: "search", type: "font-awesome-5", color: "black" }}
                                                    onPress={this.searchAndFilter}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                }

                                {this.state.filter && this.props.filters &&
                                    <View>
                                        <View style={{ justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                                            {this.props.filters.map((element, index) =>
                                                <View key={`filter_${index}`} style={{ width: "100%" }}>
                                                    {/* For date the format is mm/dd/yyyy */}
                                                    {element.type == "picker" &&
                                                        <CustomPicker
                                                            selectedValue={this.state.data[element.value_name]}
                                                            onChange={(value, index) => { this.changeFilterField(element.value_name, value) }}
                                                            data={element.data}
                                                            label={element.label}
                                                            mode="dropdown"
                                                        />
                                                    }
                                                    {element.type == "date" &&
                                                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, width: "100%" }}>
                                                            <View style={{ paddingHorizontal: 0, width: "100%" }}>
                                                                <Text style={{ fontSize: 14, color: "#86939e", fontFamily: "sans-serif", fontWeight: "bold", paddingVertical: 5 }}>
                                                                    {element.label}
                                                                </Text>
                                                                <DatePicker
                                                                    style={{ width: "100%", alignItems: "flex-start" }}
                                                                    mode="date"
                                                                    placeholder="Select date"
                                                                    format="MM/DD/YYYY"
                                                                    date={this.state.data[element.value_name]}
                                                                    onDateChange={(date) => { this.changeFilterField(element.value_name, date) }}
                                                                    customStyles={{
                                                                        dateIcon: {
                                                                            display: "none"
                                                                        },
                                                                        dateInput: {
                                                                            width: "100%",
                                                                            borderWidth: 0,
                                                                            borderBottomWidth: 1,
                                                                            paddingHorizontal: 10,
                                                                            alignItems: "flex-start"
                                                                        },
                                                                        placeholderText: {
                                                                            color: "black",
                                                                            fontSize: 16,
                                                                        },
                                                                        dateText: {
                                                                            fontSize: 16,
                                                                        }
                                                                    }}
                                                                />
                                                            </View>
                                                        </View>
                                                    }
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                }
                            </View>
                        </View>}
                </View>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};
const mapDispatchToProps = dispatch => ({
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomFilters);