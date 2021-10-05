import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

class SuccessMessage extends Component {
    render() {
        return (
            <View>
                {this.props.successMessage &&
                    <View style={{ width: "100%", height: 50, backgroundColor: "#A1D68C", padding: 5, flexDirection: 'row' , justifyContent:"flex-start", alignItems:"center"}}>
                        <View style={{borderRadius:12, backgroundColor:"white", width:26, height:26,marginHorizontal:10, justifyContent:"center"}}>
                            <Icon name="check" type="font-awesome-5" size={20} color="#A1D68C" />
                        </View>
                        <Text style={{
                           fontFamily: "Inter",
                           fontStyle: "normal",
                           fontWeight: "500",
                           fontSize: 14,
                           lineHeight: 16,
                           color: "#FFFFFF",
                        }}>
                            {this.props.successMessage}
                        </Text>
                    </View>
                }
                {this.props.errorMessage && ("string" == typeof this.props.errorMessage || this.props.errorMessage.id) &&
                    <View style={{ width: "100%", height: 50, backgroundColor: "#FD6B6B", padding: 5, flexDirection: 'row' , justifyContent:"flex-start", alignItems:"center"}}>
                    <View style={{borderRadius:12, backgroundColor:"white", width:26, height:26,marginHorizontal:10, justifyContent:"center"}}>
                        <Icon name="times" type="font-awesome-5" size={20} color="#FD6B6B" />
                    </View>
                    <Text style={{
                       fontFamily: "Inter",
                       fontStyle: "normal",
                       fontWeight: "500",
                       fontSize: 14,
                       lineHeight: 16,
                       color: "#FFFFFF",
                    }}>
                        {"string" == typeof this.props.errorMessage ? this.props.errorMessage : this.props.errorMessage.id}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}
SuccessMessage.defaultProps = {

};
SuccessMessage.propTypes = {
    successMessage: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
    errorMessage: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
}
export default SuccessMessage;