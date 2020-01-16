import React from "react";
import { StyleSheet } from "react-native";
import RectButton from "./RectButton";
import { colorSchema } from "common/src/styles";

const BackButton = props => {
  return (
    <RectButton
      onPress={props.onPress}
      style={{
        container: styles.container,
        text: styles.text
      }}
    >
      {"\u22B2"} Назад
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorSchema.stateMessageBg[3]
  },
  text: {
    color: "#FFFFFF"
  }
});

export default BackButton;
