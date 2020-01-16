import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import globalStyles, { colorSchema } from "common/src/styles";

/**
 * Компонент "Прямоугольная кнопка с фоном"
 *
 * @author serggin
 */
const RectButton = props => {
  const propsStyle = props.style || {};
  return (
    <TouchableOpacity
      style={[
        globalStyles.rectButtonContainer,
        styles.container,
        propsStyle.container
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[globalStyles.rectButtonText, styles.text, propsStyle.text]}
        numberOfLines={1}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
RectButton.propTypes = {
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0084FE"
  },
  text: {
    color: "#FFFFFF"
  }
});

export default RectButton;
