import React from "react";
import { View, StyleSheet } from "react-native";

import Button from "common/src/components/visual/form/RectButton";
import { colorSchema } from "common/src/styles";

const styles = StyleSheet.create({
  view: {},
  container: {
    backgroundColor: colorSchema.bg[2]
  },
  text: {
    color: "#FFFFFF"
  }
});

export default ({ actionType, callback }) => {
  const title = (() => {
    switch (actionType) {
      case "pass":
        return "Пас";
      case "resigned":
        return "Комп сдается";
      case "onceMore":
        return "Еще раз";
      default:
        return null;
    }
  })();

  return (
    <View style={styles.view}>
      {title && (
        <Button
          onPress={() => {
            callback(actionType);
          }}
          style={{
            container: styles.container,
            text: styles.text
          }}
        >
          {title}
        </Button>
      )}
    </View>
  );
};
