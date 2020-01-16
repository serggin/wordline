import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { getSize } from "common/src/styles";

const ImageButton = props => {
  const propsStyle = props.style || {};
  let width =
    props.maxWidth && props.maxWidth < props.imageSource.width
      ? props.maxWidth
      : props.imageSource.width;
  let height =
    width < props.imageSource.width
      ? (props.imageSource.height * width) / props.imageSource.width
      : props.imageSource.height;
  if (props.maxHeight && height > props.maxHeight) {
    width *= props.maxHeight / height;
    height = props.maxHeight;
  }
  const imageStyle = {
    width,
    height,
    resizeMode: "contain"
  };

  return (
    <TouchableOpacity
      style={[styles.container, propsStyle.container]}
      onPress={props.onPress}
    >
      <Image source={props.imageSource.source} style={[imageStyle]} />
      {props.caption && (
        <Text style={[styles.caption, propsStyle.caption]}>
          {props.caption}
        </Text>
      )}
    </TouchableOpacity>
  );
};
ImageButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  imageSource: PropTypes.object.isRequired,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  caption: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  caption: {
    fontSize: getSize("TEXT", "MEDIUM")
  }
});

export default ImageButton;
