import React from "react";
import { View, StyleSheet } from "react-native";

import { screenWidth } from "common/src/styles/index";

import WlButton from "./WlButton";
import ActionButton from "./ActionButton";

export default ({ actionType, onAction, onButton }) => {
  return (
    <View style={styles.container}>
      {actionType == "pass" &&
        WlButton(true, () => {
          onButton("left");
        })}
      <ActionButton actionType={actionType} callback={onAction} />
      {actionType == "pass" &&
        WlButton(false, () => {
          onButton("right");
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: screenWidth * 0.95,
    alignItems: "center"
  }
});
