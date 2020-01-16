import React from "react";
import PropTypes from "prop-types";
import { View, Picker, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {},
  picker: {
    width: 200
  }
});

const Select = props => {
  const { label, labelField, valueField, onChange, ...ownProps } = props;
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <Picker
        {...ownProps}
        style={styles.picker}
        onValueChange={props.onChange}
      >
        {props.items.map(i => (
          <Picker.Item
            key={i[props.valueField]}
            value={i[props.valueField]}
            label={i[props.labelField]}
          />
        ))}
      </Picker>
    </View>
  );
};

Select.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  labelField: PropTypes.string,
  valueField: PropTypes.string,
  onChange: PropTypes.func, //(itemValue, itemPosition)
  selectedValue: PropTypes.any
};
Select.defaultProps = {
  label: "",
  labelField: "label",
  valueField: "value"
};

export default Select;
