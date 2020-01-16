import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "./Modal";
import Panel from "./Panel";

import globalStyles, { baseTextSize } from "common/src/styles/index";

const letterSize = baseTextSize * 1.5;
const letterSize2 = letterSize * 2;

const styles = StyleSheet.create({
  letterContainer: {
    width: letterSize2,
    height: letterSize2,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightgrey",
    justifyContent: "center"
  },
  letterText: {
    textAlign: "center",
    fontSize: letterSize
  },
  container: {
    flex: 1,
    marginTop: 260,
    opacity: 0.5
  },
  modalContainer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "bisque",
    alignSelf: "center"
  },
  lettersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: (letterSize2 + 10) * 6,
    alignSelf: "center"
  }
});

const Letter = (letter, callback) => {
  const onLetter = () => {
    callback(letter);
  };
  return (
    <TouchableOpacity
      style={styles.letterContainer}
      onPress={onLetter}
      key={letter}
    >
      <Text style={[globalStyles.letter, styles.letterText]}>{letter}</Text>
    </TouchableOpacity>
  );
};

export default class Letters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={false}>
        <View style={styles.modalContainer}>
          <Panel
            title="Выберите букву"
            onClose={() => {
              this.props.onLetter(false);
            }}
          >
            <View style={styles.lettersContainer}>
              {this.props.letters.split("").map((letter, index) => {
                return Letter(letter, this.props.onLetter);
              })}
            </View>
          </Panel>
        </View>
      </Modal>
    );
  }
}
