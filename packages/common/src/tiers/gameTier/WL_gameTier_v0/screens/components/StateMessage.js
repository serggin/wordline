import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  screenWidth,
  colorSchema,
  baseTextSize,
  defaultFont,
  getFontStyle
} from "common/src/styles/index";

const styles = StyleSheet.create({
  view: {
    width: screenWidth * 0.95,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: "center"
  },
  message: {
    fontWeight: "bold",
    fontSize: baseTextSize * 1.2,
    ...getFontStyle(defaultFont, "bold")
  },
  imp: {
    color: colorSchema.stateMessageBg[2]
    //    backgroundColor: colorSchema.stateMessageBg[2]
  },
  move: {
    color: colorSchema.stateMessageBg[0]
    //    backgroundColor: colorSchema.stateMessageBg[0]
  },
  win: {
    color: colorSchema.stateMessageBg[3]
    //    backgroundColor: colorSchema.stateMessageBg[3]
  },
  choose: {
    color: colorSchema.stateMessageBg[0]
    //    backgroundColor: colorSchema.stateMessageBg[1]
  },
  draw: {
    color: colorSchema.stateMessageBg[4]
    //    backgroundColor: colorSchema.stateMessageBg[4]
  }
});

export default ({ messageObj }) => {
  const style = messageObj.type;
  let message;
  switch (messageObj.type) {
    case "move":
      message = "Ваш ход, " + messageObj.param + "!";
      break;
    case "imp":
      message = 'Невозможное слово "' + messageObj.param + '"';
      break;
    case "win":
      message = "Победа: " + messageObj.param;
      break;
    case "choose":
      message = "Выберите букву";
      break;
    case "draw":
      message = "Пас у всех. Ничья";
      break;
    default:
      message = "Недопустимый тип: " + messageObj.type;
  }
  return (
    <View
      style={[
        styles.view,
        { backgroundColor: StyleSheet.flatten(styles[style]).backgroundColor }
      ]}
    >
      <Text
        style={[
          styles.message,
          { color: StyleSheet.flatten(styles[style]).color }
        ]}
      >
        {message}
      </Text>
    </View>
  );
};
