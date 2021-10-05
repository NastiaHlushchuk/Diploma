import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

class CustomPaginator extends React.Component {
    constructor(props) {
        super(props);
    }
    handlePagination = (value) => {
        const { token } = this.props;
        let data = {
            system_value: value,
            system_action: "openTablePage",
            server_id: this.props.server_id
        }
        data[`${token}_system_arg_server_id`] = value
        data[`${token}_system_arg_active_tab`] = this.props.active_tab
        data[`${token}_sys_args_list`] = 'server_id,active_tab'
        console.log("Sent value",data);
        this.props.callback(data);
    }
    render() {
        let { pagination } = this.props;
        return (
            <React.Fragment>
                <View style={{ width: "100%", paddingHorizontal: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
                        <Button
                            title="Previos"
                            // disabled={pagination.is_prev_disabled != ""}
                            buttonStyle={styles.cornerButtons}
                            titleStyle={styles.commonTitle}
                            onPress={() => { this.handlePagination(pagination.prev_page_num) }}
                        />
                        <View style={{ flexDirection: "row" }}>
                            {pagination && pagination.links && pagination.links.map((el, i) =>
                                <Button
                                    key={`page_${i}`}
                                    title={"" + el.num}
                                    disabled={el.is_active != ""}
                                    disabledStyle={styles.activeButton}
                                    buttonStyle={styles.middleButtons}
                                    disabledTitleStyle={styles.activeTitle}
                                    titleStyle={styles.commonTitle}
                                    onPress={() => { this.handlePagination(el.num) }}
                                />
                            )}
                        </View>
                        <Button
                            title="Next"
                            // disabled={pagination.is_next_disabled != ""}
                            buttonStyle={styles.cornerButtons}
                            titleStyle={styles.commonTitle}
                            onPress={() => { this.handlePagination(pagination.next_page_num) }}
                        />
                    </View>
                </View>
            </React.Fragment>
        )
    }
}
const styles = {
    cornerButtons: {
        backgroundColor: "transparent",
        width: 70,
        height: 30,
        padding: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4E587B",
        marginHorizontal: 3,
    },
    middleButtons: {
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        padding: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4E587B",
        marginHorizontal: 3,
    },
    commonTitle: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 18,
        color: "#4E587B",
    },
    activeButton: {
        backgroundColor: "#4E587B",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#4E587B",
        borderRadius: 3
    },
    activeTitle: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 18,
        color: "#EFAB3C",
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
)(CustomPaginator);