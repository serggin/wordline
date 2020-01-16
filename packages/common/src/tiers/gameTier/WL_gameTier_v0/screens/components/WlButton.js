import React from "react";
import { View, StyleSheet } from "react-native";

//import Button from "common/src/components/visual/form/RectButton";
import { imageSources } from "common/src/assets/images";
import ImageButton from "common/src/components/visual/form/ImageButton";

const styles = StyleSheet.create({
  button: {
    //    width: 60, height: 30
  }
});

export default (isLeft, onPress) => {
  //  console.log("WlButtin onPress=", onPress)
  // return <Button onPress={onPress}>{isLeft ? "<" : ">"}</Button>;
  const imageSource = isLeft
    ? imageSources.leftArrowImage
    : imageSources.rightArrowImage;
  return <ImageButton imageSource={imageSource} onPress={onPress} />;
};
