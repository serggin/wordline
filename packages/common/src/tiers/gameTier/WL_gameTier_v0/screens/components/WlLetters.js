import React from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles, { baseTextSize, colorSchema } from "common/src/styles";

const letterSize = baseTextSize;
const letterSize2 = letterSize * 2;
const letterMargin = 2;
const styles = StyleSheet.create({
  letters: {
    flexDirection: "row",
    paddingTop: 5
  },
  letter: {
    height: letterSize2,
    margin: letterMargin,
    textAlign: "center",
    paddingTop: letterSize / 4,
    borderWidth: 1,
    borderColor: colorSchema.bg[5],
    backgroundColor: colorSchema.bg[5]
  },
  lastLetter: {
    borderColor: "red"
  }
});

const Letter = function(letter, widthStyle, lastStyle, index) {
  return (
    <Text
      style={[globalStyles.letter, styles.letter, widthStyle, lastStyle]}
      key={index}
    >
      {letter}
    </Text>
  );
};

export default (wordline, screenWidth) => {
  const lettersCount = wordline.letters.length || 1;
  let letterWidth = Math.floor((screenWidth - letterSize) / lettersCount);
  const margin =
    (letterSize + letterMargin * 2) * lettersCount >= screenWidth
      ? Math.max(1, Math.floor(letterMargin / 2))
      : letterMargin;
  letterWidth = Math.min(letterWidth - margin * 2, letterSize2);
  const widthStyle = {
    width: letterWidth,
    margin
  };
  return (
    <View style={styles.letters}>
      {wordline.letters.length > 0
        ? wordline.letters.split("").map((letter, index) => {
            return Letter(
              letter,
              widthStyle,
              wordline.lastIndex == index ? styles.lastLetter : {},
              index
            );
          })
        : Letter("", { width: letterWidth }, {})}
    </View>
  );
};
