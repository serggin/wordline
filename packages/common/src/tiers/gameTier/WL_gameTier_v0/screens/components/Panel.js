import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import {
  baseTextSize
} from "common/src/styles/index";

const styles = StyleSheet.create({
  titlebarContainer: {
    backgroundColor: "silver",
    padding: 5
  },
  title: {
    fontSize: baseTextSize
  },
  closeContainer: {
    position: "absolute",
    right: 5
  },
  container: {
    borderWidth: 1
  },
  panelContent: {
    padding: 5,
    alignContent: "flex-start"
  }
});

const TitleBar = ({ title, onClose }) => {
  return (
    <View style={styles.titlebarContainer}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
        <Text style={styles.title}>x</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ({ title, onClose, children }) => {
  return (
    <View style={styles.container}>
      <TitleBar title={title} onClose={onClose} />
      <View style={styles.panelContent}>{children}</View>
    </View>
  );
};
