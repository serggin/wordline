import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import globalStyles, {
  colorSchema,
  defaultFont,
  getFontStyle,
  getSize
} from "common/src/styles";
import { TopSpanielGamesLogo } from "common/src/assets/images";
import BaseScreen from "common/src/components/visual/BaseScreen";
import TextLink from "common/src/components/visual/form/TextLink";
import Checkbox from "common/src/components/visual/form/Checkbox";
import StyledButton from "common/src/components/visual/form/StyledButton";

export default class WelcomeScreen extends BaseScreen {
  static gamecaseTier = null;
  state = {
    rules: "",
    gameName: "",
    players: false,
    useMovetime: false,
    movetime: ""
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[globalStyles.screen, { paddingTop: 0 }]}>
        <TopSpanielGamesLogo />

        <Text style={[globalStyles.h1Text, styles.headerText]}>
          {this.state.gameName}
        </Text>
        <Text style={[globalStyles.h2Text, styles.headerText]}>
          Имена игроков
        </Text>
        <View style={styles.playersContainer}>
          {this.state.players &&
            this.state.players.map(player => (
              <View style={styles.playerContainer} key={player.alias}>
                <Text style={[globalStyles.text, styles.playerLabel]}>
                  {this.state.playersLabels[player.alias]} :
                </Text>
                <TextInput
                  style={[globalStyles.textInput, styles.textInput]}
                  defaultValue={this.state.playersNames[player.alias]}
                  onChangeText={text => {
                    this.playerNameChanged(player.alias, text);
                  }}
                />
              </View>
            ))}
          <View style={styles.playerContainer}>
            <Checkbox
              checked={this.state.useMovetime}
              onChange={this.onUseMovetimeChange}
            />
            <Text style={[globalStyles.text, styles.limitLabel]}>
              Лимит времени на ход
            </Text>
            {this.state.useMovetime && (
              <TextInput
                style={[globalStyles.textInput, styles.limitInput]}
                keyboardType="numeric"
                defaultValue={this.state.movetime}
                onChangeText={text => {
                  this.movetimeChanged(text);
                }}
              />
            )}
          </View>
        </View>
        <View style={styles.startContainer}>
          <TextLink
            onPress={() => navigate("Rules", { rules: this.state.rules })}
            style={styles.rulesLink}
          >
            Правила игры ...
          </TextLink>
          {/*Checkbox использовать слова помимо словаря - только для людей*/}
          {/*Условие победы - число выигрышей или счет*/}
          <StyledButton
            style={{
              container: styles.startButtonContainer,
              text: styles.startButton
            }}
            onPress={this.onGameStart}
          >
            Начать игру
          </StyledButton>
        </View>
      </View>
    );
  }

  onGameStart = () => {
    WelcomeScreen.gamecaseTier.start({
      playersNames: this.state.playersNames,
      movetime: this.state.useMovetime && parseInt(this.state.movetime)
    });
  };

  didFocusHandler(payload) {
    super.didFocusHandler(payload);
    WelcomeScreen.gamecaseTier.execute(this);
  }

  initialize(gamecaseConfig) {
    this.gamecaseConfig = gamecaseConfig;
    let playersLabels = {};
    let playersNames = {};
    gamecaseConfig.players.forEach(player => {
      playersLabels[player.alias] = player.name;
      playersNames[player.alias] = player.name;
    });
    this.setState({
      rules: this.gamecaseConfig.rules,
      gameName: this.gamecaseConfig.name,
      players: this.gamecaseConfig.players,
      playersLabels,
      playersNames,
      useMovetime: false,
      movetime: this.gamecaseConfig.movetime.toString()
    });
  }

  playerNameChanged(alias, newName) {
    let playersNames = this.state.playersNames;
    playersNames[alias] = newName;
    this.setState({
      playersNames
    });
  }

  movetimeChanged(text) {
    this.setState({
      movetime: text
    });
  }

  onUseMovetimeChange = checked => {
    this.setState({ useMovetime: checked });
  };

  static navigationOptions = {
    title: "WelcomeScreen"
  };
}

const smallTextFontSize = getSize("TEXT", "SMALL");
const styles = StyleSheet.create({
  playersContainer: {},
  playerContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: getSize("TEXT", "SMALL") / 2,
    paddingBottom: getSize("TEXT", "SMALL") / 2
  },
  playerLabel: {
    width: smallTextFontSize * 8,
    ...getFontStyle(defaultFont, "bold")
  },
  limitLabel: {
    paddingLeft: smallTextFontSize / 2,
    paddingRight: smallTextFontSize,
    fontSize: smallTextFontSize,
    fontWeight: "bold"
  },
  textInput: {
    paddingLeft: 10,
    fontWeight: "900",
    fontSize: 24
  },
  limitInput: {
    width: smallTextFontSize * 6
  },
  startContainer: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  rulesLink: {
    alignSelf: "flex-end",
    fontSize: getSize("TEXT", "MEDIUM"),
  },
  startButtonContainer: {
    backgroundColor: colorSchema.bg[2]
  },
  startButton: {
    fontSize: getSize("TEXT", "MEDIUM")
  },
  headerText: {
    color: colorSchema.text[3]
  }
});
