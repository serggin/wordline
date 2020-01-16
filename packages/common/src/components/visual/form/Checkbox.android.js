import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import BaseCheckBox from "@react-native-community/checkbox";

export default class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func //(checked)
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  _onChange = () => {
    const checked = !this.state.checked;
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  };

  render() {
    const { ...ownProps } = this.props;
    return (
      <View style={styles.container}>
        <BaseCheckBox
          {...ownProps}
          value={this.state.checked}
          onValueChange={this._onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
