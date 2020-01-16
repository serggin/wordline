import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text
} from "react-native";
import PropTypes from "prop-types";

import { imageSources } from "common/src/assets/images";
import globalStyles, { getSize } from "common/src/styles/index";

const StyledButton = props => {
  const propsStyle = props.style || {};
  return (
    <TouchableOpacity
      style={[styles.container, propsStyle.container]}
      onPress={props.onPress}
    >
      <ImageBackground
        source={imageSources.bgImage0.source}
        style={[globalStyles.rectButtonContainer, styles.bgImage]}
      >
        <Text
          style={[globalStyles.rectButtonText, styles.text, propsStyle.text]}
          numberOfLines={1}
        >
          {props.children}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

StyledButton.propTypes = {
  style: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },
  bgImage: {},
  text: {
    color: "#FFFFFF"
  }
});

export default StyledButton;
