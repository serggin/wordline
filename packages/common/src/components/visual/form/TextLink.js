import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

import globalStyles from "common/src/styles/index";

/**
 * Компонент "Текстовая ссылка"
 *
 * @author serggin
 */
const TextLink = props => {
  return (
    <Text style={[globalStyles.textLink, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
TextLink.propTypes = {
  onPress: PropTypes.func
};

export default TextLink;
