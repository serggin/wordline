import React from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles, { baseTextSize } from "common/src/styles/index";

const letterSize = baseTextSize;

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
    fontSize: letterSize * 1.5,
    paddingBottom: 20
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 5
  },
  label: {
    fontSize: letterSize,
    width: letterSize * 8
  },
  pass: {
    fontWeight: "bold",
    fontSize: letterSize,
    color: "darkblue"
  }
});

const metric = (label, metric) => (
  <View style={styles.metrics}>
    <Text style={[globalStyles.text, styles.label]}>{label} :</Text>
    <Text style={globalStyles.text}>{metric}</Text>
  </View>
);

export default ({ name, metrics, pass, timer }) => {
  return (
    <View>
      <Text style={[globalStyles.text, styles.name]}>{name}</Text>
      {metric("Счет", metrics.score)}
      {metric("Побед", metrics.wins)}
      {metric("Поражений", metrics.losses)}
      <Text style={[globalStyles.text, styles.pass]}>
        {pass ? (timer ? "Таймер" : "Пас") : " "}
      </Text>
    </View>
  );
};
