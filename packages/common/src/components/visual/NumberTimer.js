import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colorSchema, getSize } from "common/src/styles/index";

export default class NumberTimer extends React.Component {
  static propTypes = {
    timeLimit: PropTypes.number.isRequired,
    onTimer: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.timeLimit = props.timeLimit;
    this.onTimer = props.onTimer;
    this.state = {
      intervalID: undefined
    };
  }

  componentDidMount() {
    if (this.timeLimit > 0) {
      this.startTimer();
    }
  }

  _tick = () => {
    if (this.state.seconds > 1) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.state.intervalID);
      this.setState({
        intervalID: undefined
      });
      if (this.onTimer) {
        this.onTimer();
      }
    }
  };

  startTimer() {
    let intervalID = setInterval(this._tick, 1000);
    this.setState({
      intervalID,
      seconds: parseInt(this.timeLimit)
    });
  }

  stopTimer() {
    if (this.state.intervalID) {
      clearInterval(this.state.intervalID);
      this.setState({
        intervalID: undefined
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.intervalID && (
          <View style={styles.container}>
            <Text style={styles.seconds}>{this.state.seconds}</Text>
            <Text style={styles.label}>сек.</Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

const secondsFontSize = getSize("TEXT", "LARGE");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  seconds: {
    color: colorSchema.text[0],
    fontSize: secondsFontSize
  },
  label: {
    color: colorSchema.text[0],
    fontSize: secondsFontSize
  }
});
