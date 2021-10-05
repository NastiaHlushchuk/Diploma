import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

class CustomInput extends Component {
  render() {
    return (
      <View style={[this.props.containerStyle, { paddingHorizontal: this.props.hasPaddings ? 10 : 0, backgroundColor: this.props.background }]}>
        <View style={{ paddingHorizontal: 0, backgroundColor: this.props.background }}>
          {this.props.label ? <Text style={[this.props.labelStyle]}>{this.props.label}</Text> : null}
          <CheckBox {...this.props}
            containerStyle={{ borderWidth: 0, backgroundColor: this.props.background, padding: 0, margin: 0, marginLeft: 0, marginRight: 0 }} />
        </View>
      </View>
    )
  }
}
CustomInput.defaultProps = {
  labelStyle: { fontSize: 14, color: "#86939e", fontFamily: "sans-serif", fontWeight: "bold", padding: 0 },
  mode: "dialog",
  disabled: false,
  background: "#e9eff3",
  hasPaddings: true,
};
CustomInput.propTypes = {
  hasPaddings: PropTypes.bool,
  background: PropTypes.string,
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  data: PropTypes.array,
  mode: PropTypes.string,
}
export default CustomInput;